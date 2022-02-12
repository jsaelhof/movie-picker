import "../node_modules/react-vis/dist/style.css";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  FlexibleWidthXYPlot,
  XAxis,
  CustomSVGSeries,
  MarkSeries,
  PolygonSeries,
} from "react-vis";

import { useAppContext } from "../context/app-context";
import { useRemoveMovie } from "../hooks/use-remove-movie";
import { useEditMovie } from "../hooks/use-edit-movie";
import { errorMessage } from "../constants/error_codes";
import { omitTypename } from "../utils/omit-typename";
import ErrorDialog from "../components/error-dialog/error-dialog";
import WatchedList from "../components/watched-list/watched-list";
import PageContainer from "../components/page-container/page-container";
import {
  format,
  parseISO,
  subWeeks,
  isWithinInterval,
  addDays,
  subDays,
  max,
  isBefore,
  isAfter,
  min,
  addWeeks,
} from "date-fns";
import { orderBy, tap, flow, reduce } from "lodash/fp";
import MoviePoster from "../components/movie-poster/movie-poster";
import { Button, useMediaQuery } from "@mui/material";
import { cond, constant, first, last, stubTrue } from "lodash";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";

const PosterImage = ({ movie }) => (
  <>
    <rect x="-0.5" y="0" width="1" height="125" fill="black" />

    <foreignObject x="-64" y="-100" width="128" height="200">
      {/* 
      MoviePoster renders a position:relative div by default. It's needed internally for positioning the lock.
      This causes the posters to appear in the corner of the page in Safari. To fix it, I've added a prop to remove
      the relative positioning which works in this case because we don't want to use the locked state anyway.
      */}
      <MoviePoster movie={movie} height={200} noRel noLock />
    </foreignObject>
  </>
);

const useWatchedMovieChartData = (series) => {
  const [xDomain, setXDomain] = useState(null);
  const [fullXDomain, setFullXDomain] = useState(null);
  const [prevCount, setPrevCount] = useState(false);
  const [nextCount, setNextCount] = useState(false);

  const threeWeek = useMediaQuery("(max-width: 700px)");
  const fourWeek = useMediaQuery("(max-width: 950px)");
  const sixWeek = useMediaQuery("(max-width: 1250px)");
  const eightWeek = useMediaQuery("(max-width: 1550px)");

  const weeks = cond([
    [constant(threeWeek), constant(3)],
    [constant(fourWeek), constant(4)],
    [constant(sixWeek), constant(6)],
    [constant(eightWeek), constant(8)],
    [stubTrue, constant(10)],
  ])();

  useEffect(() => {
    if (series?.length > 0) {
      // const sorted = sortMovies(watchedMovies);
      // if (!sortedMovies) setSortedMovies(sorted);

      // FIXME: Can this be removed? Or extracted? Its repeating what happens in the next/prev functions to a large degree.
      const minRange = subDays(first(series).x, 3);
      // const minRange = subDays(parseISO(first(sorted).watchedOn), 3);
      const maxRange = addDays(last(series).x, 3);
      // const maxRange = addDays(parseISO(last(sorted).watchedOn), 3);
      setFullXDomain([minRange, maxRange]);
      setXDomain([max([minRange, subWeeks(maxRange, weeks)]), maxRange]);
    }
  }, [series, weeks]);

  useEffect(() => {
    if (xDomain) {
      setPrevCount(series.filter(({ x }) => isBefore(x, xDomain[0])).length);
      setNextCount(series.filter(({ x }) => isAfter(x, xDomain[1])).length);
    }
  }, [series, xDomain]);

  const prev = useCallback(() => {
    // Get movie immediately before the start of the current range and use its date as the starting point.
    const anchorDate = addDays(
      last(series.filter(({ x }) => isBefore(x, xDomain[0]))).x,
      3
    );

    console.log(anchorDate);

    // Either get the X weeks before the anchor -OR- the date of the oldest movie in the list.
    const newX0 = max([subWeeks(anchorDate, weeks), fullXDomain[0]]);

    // Based on the date for the start, add X weeks -OR- use the date of most recent movie in the list.
    const newX1 = min([addWeeks(newX0, weeks), fullXDomain[1]]);

    setXDomain([newX0, newX1]);
  }, [fullXDomain, series, weeks, xDomain]);

  const next = useCallback(() => {
    // Get movie immediately after the end of the current range and use its date as the starting point.
    const anchorDate = subDays(
      first(series.filter(({ x }) => isAfter(x, xDomain[1]))).x,
      3
    );

    // Either get the X weeks after the anchor -OR- the date of the most recent movie in the list.
    const newX1 = min([addWeeks(anchorDate, weeks), fullXDomain[1]]);

    // Based on the date for the end, subtract X weeks -OR- use the date of oldest movie in the list.
    const newX0 = max([subWeeks(newX1, weeks), fullXDomain[0]]);

    setXDomain([newX0, newX1]);
  }, [fullXDomain, series, weeks, xDomain]);

  return {
    xDomain,
    fullXDomain,
    prevCount,
    nextCount,
    prev,
    next,
  };
};

export default function Home() {
  const { list, watchedMovies } = useAppContext();
  const [error, setError] = useState(null);
  // const [focusedPoster, setFocusedPoster] = useState(null);

  const editMovie = useEditMovie();
  const removeMovie = useRemoveMovie(setError);

  const series = useMemo(
    () =>
      flow(
        orderBy("watchedOn", ["asc"]),
        reduce((acc, movie) => {
          const date = parseISO(movie.watchedOn);

          // Current rendering all movies.
          // If this becomes non-performant, use isWithinInterval to filter some movies out.
          // I'll just need to figure out how far on either each of the chart to overflow.
          acc.push({
            x: date,
            y: 1,
            movie,
            customComponent: PosterImage,
            // focused: movie.id === focusedPoster,
          });
          return acc;
        }, [])
        // If a poster is hovered, move it to the end so it has the highest natural zIndex
        // tap((series) =>
        //   !focusedPoster
        //     ? series
        //     : series.push(
        //         series.splice(
        //           series.findIndex(({ movie }) => focusedPoster === movie.id),
        //           1
        //         )[0]
        //       )
        // )
      )(watchedMovies),
    [watchedMovies]
  );

  const { xDomain, fullXDomain, prevCount, nextCount, prev, next } =
    useWatchedMovieChartData(series);

  return (
    <>
      <PageContainer>
        {xDomain && (
          <div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Button
                startIcon={<ChevronLeft />}
                disabled={prevCount === 0}
                onClick={prev}
              >
                Prev
              </Button>
              <Button
                endIcon={<ChevronRight />}
                disabled={nextCount === 0}
                onClick={next}
              >
                Next
              </Button>
            </div>
            <FlexibleWidthXYPlot
              height={300}
              yDomain={[0, 2]}
              xDomain={xDomain}
              xType="time"
              margin={{
                left: 1,
                right: 1,
              }}
            >
              <CustomSVGSeries
                data={series}
                // TODO: Sort this movie to the end of the data list
                // onValueMouseOver={({ movie }) => setFocusedPoster(movie.id)}
              />
              <XAxis
                tickValues={[...series.map(({ x }) => x)]}
                tickFormat={(v) => format(new Date(v), "MMM do")}
                tickSizeInner={0}
                style={{ line: { stroke: "grey" } }}
              />
            </FlexibleWidthXYPlot>

            <FlexibleWidthXYPlot
              height={40}
              yDomain={[0, 2]}
              xDomain={fullXDomain}
              xType="time"
              margin={{
                left: 1,
                right: 1,
                bottom: 0,
                top: 0,
              }}
            >
              <PolygonSeries
                data={[
                  { x: fullXDomain[0], y: 0 },
                  { x: fullXDomain[0], y: 2 },
                  { x: xDomain[0], y: 2 },
                  { x: xDomain[0], y: 0 },
                  { x: fullXDomain[0], y: 0 },
                ]}
                style={{
                  fill: "rgba(0,0,0,0.05)",
                  stroke: "darkgrey",
                  strokeWidth: 1,
                }}
              />
              <PolygonSeries
                data={[
                  { x: xDomain[1], y: 0 },
                  { x: xDomain[1], y: 2 },
                  { x: fullXDomain[1], y: 2 },
                  { x: fullXDomain[1], y: 0 },
                  { x: xDomain[1], y: 0 },
                ]}
                style={{ fill: "rgba(0,0,0,0.05)" }}
              />
              <MarkSeries
                colorType="literal"
                data={watchedMovies.map(({ watchedOn }) => ({
                  x: parseISO(watchedOn),
                  y: 1,
                  color: isWithinInterval(parseISO(watchedOn), {
                    start: xDomain[0],
                    end: xDomain[1],
                  })
                    ? "darkgrey"
                    : "lightgrey",
                }))}
              />
            </FlexibleWidthXYPlot>

            <WatchedList
              movies={watchedMovies}
              onEditMovie={(movie) =>
                editMovie({
                  variables: { movie: omitTypename(movie), list: list.id },
                })
              }
              onRemoveMovie={(id) =>
                removeMovie({
                  variables: {
                    movieId: id,
                    list: list.id,
                  },
                })
              }
            />
          </div>
        )}
      </PageContainer>

      <ErrorDialog
        open={!!error}
        content={
          errorMessage[error] || errorMessage.UNKNOWN.replace("%%", error)
        }
        onConfirm={() => setError(null)}
      />
    </>
  );
}
