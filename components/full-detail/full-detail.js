import React, { useCallback, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { Button, useMediaQuery } from "@mui/material";
import { ChevronLeft, ChevronRight, PlayArrow } from "@mui/icons-material";
import { useSpring } from "react-spring";
import Search from "@mui/icons-material/Search";
import TelevisionPlay from "@mitch528/mdi-material-ui/TelevisionPlay";
import CloseThick from "@mitch528/mdi-material-ui/CloseThick";

import { formatRuntime } from "../../utils/format-runtime";
import { genreLabels } from "../../constants/genres";
import { searchStreaming, searchTMDB, searchTorrent } from "../../utils/search";
import { sourceLogosLarge, sources } from "../../constants/sources";
import { useGetMovieExtendedDetails } from "../../graphql/queries";
import { editMovieOptions, useEditMovie } from "../../graphql/mutations";
import { useAppContext } from "../../context/app-context";
import {
  Actions,
  Backdrop,
  BackdropWrapper,
  CloseButton,
  FullDetailLayout,
  MovieData,
  MovieInfo,
  MovieTitle,
  NextBackgroundButton,
  PlotLayout,
  Poster,
  PrevBackgroundButton,
  RatingsArea,
  smallMovieTitle,
  Source,
  streamable,
  TrailerLayout,
} from "./full-detail.styles";
import { FullDetailSkeleton } from "./full-detail.skeleton";
import MoviePoster from "../movie-poster/movie-poster";
import Rated from "./rated";
import Trailer from "./trailer";
import ScrollArea from "./scroll-area";
import Footer from "./footer";
import { StarRatingLayout } from "./star-rating-layout";

const FullDetail = ({ movie, showCloseButton = false, onClose }) => {
  const { list } = useAppContext();
  const small = useMediaQuery("(max-width: 750px)");
  const noPlotScroll = useMediaQuery("(max-width: 660px), (max-height: 414px)");
  const trailerOverlay = useMediaQuery(
    "(max-width: 500px), (max-height: 414px)"
  );

  const [editMovieMutation] = useEditMovie();
  const onBackdropRotate = useCallback(
    (forward) => () => {
      if (data.backdrops) {
        editMovieMutation(
          editMovieOptions(
            {
              ...movie,
              background: getNeighbor(data.backdrops, backdrop, forward),
            },
            list
          )
        );
      }
    },
    [backdrop, data.backdrops, editMovieMutation, list, movie]
  );

  const { data, loading } = useGetMovieExtendedDetails(movie);

  const [trailer, setTrailer] = useState(null);

  const fadeSpring = useSpring({
    opacity: data ? 1 : 0,
  });

  const growSpring = useSpring({
    from: {
      transform: "translateX(-100px)",
    },
    transform: data ? "translateX(0)" : "translateX(-100px)",
    reset: data === null,
  });

  const search = useCallback(() => {
    window.open(searchTMDB(movie.title), "moviedb");
  }, [movie]);

  const canStream = ![sources.DVD, sources.NONE].includes(movie.source);

  const backdrop = useMemo(
    () => movie.background || data.backdrops?.[0],
    [data.backdrops, movie.background]
  );

  return loading ? (
    <FullDetailSkeleton
      showCloseButton={showCloseButton}
      onClose={onClose}
      small={small}
    />
  ) : (
    <FullDetailLayout>
      {showCloseButton && (
        <CloseButton onClick={onClose}>
          <CloseThick />
        </CloseButton>
      )}

      <BackdropWrapper>
        <Backdrop
          sx={[
            {
              backgroundImage: `url("${backdrop}")`,
            },
          ]}
          style={{
            ...fadeSpring,
          }}
        />

        <PrevBackgroundButton onClick={onBackdropRotate(false)}>
          <ChevronLeft />
        </PrevBackgroundButton>

        <NextBackgroundButton onClick={onBackdropRotate(true)}>
          <ChevronRight />
        </NextBackgroundButton>

        {trailer && !trailerOverlay && (
          <TrailerLayout>
            <Trailer trailerId={trailer} onComplete={() => setTrailer(null)} />
          </TrailerLayout>
        )}
      </BackdropWrapper>

      {trailer &&
        trailerOverlay &&
        createPortal(
          <Trailer
            overlay
            trailerId={trailer}
            onComplete={() => setTrailer(null)}
          />,
          document.body
        )}

      <MovieInfo>
        <Poster style={growSpring}>
          <MoviePoster
            height={small ? 300 : 400}
            movie={movie}
            onClick={search}
            noLock
          />
        </Poster>

        <MovieTitle
          sx={[(small || movie.title.length >= 25) && smallMovieTitle]}
        >
          <div>{movie.title}</div>

          <RatingsArea>
            <StarRatingLayout ratings={data.ratings} />
          </RatingsArea>
        </MovieTitle>

        <MovieData>
          <div>{formatRuntime(movie.runtime)}</div>
          <div>{movie.year}</div>
          <div>{genreLabels[movie.genre]}</div>
          <Rated rated={data.rated} />
        </MovieData>

        <Source
          sx={[canStream && streamable]}
          src={sourceLogosLarge[movie.source]}
          onClick={() =>
            canStream &&
            window.open(searchStreaming(movie.title, movie.source), "movieView")
          }
        />

        <PlotLayout>
          <ScrollArea text={data.plot} noScroll={noPlotScroll} />
        </PlotLayout>

        <Actions>
          {data.trailer?.site === "YouTube" && (
            <Button
              color="primary"
              startIcon={<TelevisionPlay />}
              onClick={() => setTrailer(data.trailer.key)}
            >
              Watch Trailer
            </Button>
          )}

          {canStream && (
            <Button
              color="primary"
              startIcon={<PlayArrow />}
              onClick={() => {
                window.open(
                  searchStreaming(movie.title, movie.source),
                  "movieView"
                );
              }}
            >
              Stream Movie
            </Button>
          )}

          {movie.source === sources.NONE && (
            <Button
              color="primary"
              startIcon={<Search />}
              onClick={() => {
                window.open(searchTorrent(movie.title), "movieView");
              }}
            >
              Torrent Search
            </Button>
          )}
        </Actions>
      </MovieInfo>

      <Footer movie={movie} />
    </FullDetailLayout>
  );
};

const getNeighbor = (arr, item, forward = true) => {
  const currentIndex = arr.findIndex((val) => val === item);
  const index = (currentIndex + (forward ? 1 : arr.length - 1)) % arr.length;
  return arr[index];
};

export default FullDetail;
