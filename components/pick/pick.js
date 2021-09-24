import styles from "./pick.module.css";

import React, { useCallback, useEffect, useState } from "react";
import { useMediaQuery } from "@material-ui/core";
import { filter, find } from "lodash";
import axios from "axios";
import clsx from "clsx";

import { formatRuntime } from "../../utils/format-runtime";
import { api } from "../../constants/api";
import { genreLabels } from "../../constants/genres";
import { searchTMDB } from "../../utils/search";
import Rated from "./rated";
import MoviePoster from "../movie-poster/movie-poster";
import Ratings from "../ratings/ratings";
import { animated, useSpring } from "react-spring";

const getTrailer = (data) => {
  const trailerData = find(
    filter(data.videos?.results, ["type", "Trailer"]),
    "official"
  );
  if (!trailerData) return null;

  const { site, key } = trailerData;
  switch (site) {
    case "YouTube":
      return `https://www.youtube.com/watch?v=${key}`;
    case "Vimeo":
      return `https://www.vimeo.com/${key}`;
    default:
      console.warn(`No pattern exists for site "${site}"`);
      return null;
  }
};

const toTMDBImageUrl = (path, size = "original") =>
  api.TMDB_IMAGE_URL.replace("%size%", size).replace("%path%", path);

const Pick = ({ movie }) => {
  const twoCol = useMediaQuery("(max-width: 875px)");
  const small = useMediaQuery("(max-width: 740px)");
  const xsmall = useMediaQuery("(max-width: 680px)");

  const [data, setData] = useState(null);

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

  useEffect(() => {
    const fetchData = async () => {
      setData(null);

      if (movie.imdbID) {
        const { data } = await axios.get(
          api.TMBD_IMDB.replace("%id%", movie.imdbID)
        );
        setData(data);

        console.log(getTrailer(data));
      }
    };

    fetchData();
  }, [movie]);

  return (
    <div className={styles.pickGrid}>
      <animated.div
        className={clsx(
          styles.pickContainer,
          small && styles.pickContainerSmall
        )}
        style={{
          ...(data
            ? {
                backgroundImage: `linear-gradient(to top, white, transparent 70%), url("${toTMDBImageUrl(
                  data.backdrop_path
                )}")`,
              }
            : {
                backgroundImage: "linear-gradient(to top, white, #ccc)",
              }),
          ...fadeSpring,
        }}
      />

      {data && (
        <div
          className={clsx(
            styles.movieInfo,
            twoCol && styles.movieInfoTwoCol,
            xsmall && styles.movieInfoOneCol
          )}
        >
          <animated.div style={growSpring}>
            <MoviePoster
              height={xsmall ? 300 : 400}
              movie={movie}
              className={clsx(styles.poster, xsmall && styles.posterXSmall)}
              onClick={search}
            />
          </animated.div>

          <div
            className={clsx(
              styles.title,
              (movie.title.length > 25 || small) && styles.titleSmall,
              xsmall && styles.titleXSmall
            )}
          >
            <div>{movie.title}</div>
          </div>

          <div className={styles.movieData}>
            <div>{formatRuntime(movie.runtime)}</div>
            <div>{movie.year}</div>
            <div>{genreLabels[movie.genre]}</div>
            <Rated
              rated={
                data?.releases?.countries.filter(
                  ({ certification, iso_3166_1 }) =>
                    certification !== "" && iso_3166_1 === "US"
                )?.[0]?.certification
              }
            />
          </div>

          <Ratings
            ratings={movie.ratings}
            className={clsx(
              styles.ratings,
              twoCol && styles.ratingsTwoCol,
              xsmall && styles.ratingsOneCol
            )}
          />

          <div className={styles.plot}>{data.overview}</div>

          {/* <div style={{ gridArea: "actions" }}>
              <a href={getTrailer(data)} target="_blank">
                Trailer
              </a>
            </div> */}
        </div>
      )}
    </div>
  );
};

export default Pick;
