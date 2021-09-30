import styles from "./pick.module.css";

import React, { useCallback, useEffect, useState } from "react";
import { IconButton, useMediaQuery } from "@material-ui/core";
import { filter, find, first, isNil, reject } from "lodash";
import axios from "axios";
import clsx from "clsx";

import { formatRuntime } from "../../utils/format-runtime";
import { api } from "../../constants/api";
import { genreLabels } from "../../constants/genres";
import { searchStreaming, searchTMDB } from "../../utils/search";
import Rated from "./rated";
import MoviePoster from "../movie-poster/movie-poster";
import { animated, useSpring } from "react-spring";
import { sourceLogosLarge, sources } from "../../constants/sources";
import TelevisionPlay from "mdi-material-ui/TelevisionPlay";
import StarRating from "../ratings/star-rating";
import { PlayArrow } from "@material-ui/icons";

const getTrailer = (data) => {
  const officialTrailer = find(
    filter(data?.videos?.results, ["type", "Trailer"]),
    "official"
  );
  const anyTrailer = first(filter(data?.videos?.results, ["type", "Trailer"]));
  const trailerData = first(reject([officialTrailer, anyTrailer], isNil));

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
  const large = useMediaQuery("(min-width: 1200px)");
  const small = useMediaQuery("(max-width: 750px)");
  const xsmall = useMediaQuery("(max-width: 660px)");

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
        try {
          const { data } = await axios.get(
            api.TMBD_IMDB.replace("%id%", movie.imdbID)
          );
          setData(data);
        } catch (ex) {
          setData({});
        }
      }
    };

    fetchData();
  }, [movie]);

  const canStream = ![sources.DVD, sources.NONE].includes(movie.source);

  // TODO: Try aligning the content on the bottom of the screen?
  // TODO: Move the actions into the right grid area.
  return (
    <div className={styles.pickGrid}>
      <animated.div
        className={clsx(
          styles.backdrop,
          small && styles.backdropSmall,
          large && styles.backdropLarge
        )}
        style={{
          ...(data?.backdrop_path
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
            large && styles.movieInfoLarge,
            small && styles.movieInfoSmall,
            xsmall && styles.movieInfoXSmall
          )}
        >
          <animated.div
            className={clsx(styles.poster, xsmall && styles.posterXSmall)}
            style={growSpring}
          >
            <MoviePoster
              height={small ? 300 : 400}
              movie={movie}
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
            <StarRating
              ratings={movie.ratings}
              className={clsx(styles.ratings)}
            />
          </div>

          <div
            className={clsx(
              styles.movieData,
              small && styles.movieDataSmall,
              xsmall && styles.movieDataXSmall
            )}
          >
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

          <img
            src={sourceLogosLarge[movie.source]}
            className={clsx(styles.source, canStream && styles.activeSource)}
            onClick={() =>
              canStream &&
              window.open(
                searchStreaming(movie.title, movie.source),
                "movieView"
              )
            }
          />

          <div className={styles.plot}>
            {data.overview || "No Plot - Check OMDB?"}
          </div>

          <div className={styles.actions}>
            {getTrailer(data) && (
              <IconButton
                onClick={() => {
                  window.open(getTrailer(data), "_blank");
                }}
              >
                <TelevisionPlay />
              </IconButton>
            )}

            {canStream && (
              <IconButton
                onClick={() => {
                  window.open(
                    searchStreaming(movie.title, movie.source),
                    "movieView"
                  );
                }}
              >
                <PlayArrow />
              </IconButton>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Pick;
