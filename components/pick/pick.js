import styles from "./pick.module.css";

import React, { useCallback, useState } from "react";
import { Button, useMediaQuery } from "@material-ui/core";
import clsx from "clsx";

import { formatRuntime } from "../../utils/format-runtime";
import { genreLabels } from "../../constants/genres";
import { searchStreaming, searchTMDB, searchTorrent } from "../../utils/search";
import Rated from "./rated";
import MoviePoster from "../movie-poster/movie-poster";
import { animated, useSpring } from "react-spring";
import { sourceLogosLarge, sources } from "../../constants/sources";
import TelevisionPlay from "mdi-material-ui/TelevisionPlay";
import StarRating from "../ratings/star-rating";
import { PlayArrow } from "@material-ui/icons";
import Search from "@material-ui/icons/Search";
import { useQuery } from "@apollo/client";
import { GET_MOVIE_EXTENDED_DETAILS } from "../../graphql";

const buildTrailerUrl = ({ site, key }) => {
  switch (site) {
    case "YouTube":
      return `https://www.youtube.com/embed/${key}?autoplay=1`;
    case "Vimeo":
      return `https://player.vimeo.com/video/${key}`;
    default:
      console.warn(`No pattern exists for site "${site}"`);
      return null;
  }
};

const Pick = ({ movie }) => {
  const xlarge = useMediaQuery("(min-width: 2000px)");
  const large = useMediaQuery("(min-width: 1200px)");
  const small = useMediaQuery("(max-width: 750px)");
  const xsmall = useMediaQuery("(max-width: 660px)");
  const xxsmall = useMediaQuery("(max-width: 450px)");

  const [data, setData] = useState(null);
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

  useQuery(GET_MOVIE_EXTENDED_DETAILS, {
    errorPolicy: "all",
    variables: {
      imdbID: movie.imdbID,
    },
    onCompleted: ({ tmdbMovie, omdbMovie }) =>
      setData({ ...omdbMovie, ...tmdbMovie }),
    onError: () => setData({}),
  });

  const canStream = ![sources.DVD, sources.NONE].includes(movie.source);

  return (
    <div className={styles.pickGrid}>
      <div
        className={clsx(
          styles.backdropWrapper,
          small && styles.backdropWrapperSmall,
          large && styles.backdropWrapperarge,
          xlarge && styles.backdropWrapperXLarge
        )}
      >
        <animated.div
          className={styles.backdrop}
          style={{
            ...(data?.backdrop
              ? {
                  backgroundImage: `url("${data.backdrop}")`,
                }
              : {
                  backgroundImage: "linear-gradient(to top, white, #ccc)",
                }),
            ...fadeSpring,
          }}
        />
      </div>

      {trailer && (
        <div className={styles.playerWrapper} onClick={() => setTrailer(null)}>
          <iframe
            src={trailer}
            frameborder="0"
            allow="autoplay; clipboard-write; encrypted-media;"
            allowfullscreen
            className={styles.player}
          ></iframe>
        </div>
      )}

      {data && (
        <div
          className={clsx(
            styles.movieInfo,
            xlarge && styles.movieInfoXLarge,
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
              (movie.title.length >= 25 || small) && styles.titleSmall,
              xsmall && styles.titleXSmall
            )}
          >
            <div>{movie.title}</div>
            <StarRating
              ratings={movie.ratings}
              anchor={xsmall ? "center" : "left"}
              className={styles.ratings}
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
            <Rated rated={data.certification} />
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

          <div className={styles.plot}>{data.plot}</div>

          <div
            className={clsx(
              styles.actions,
              xsmall && styles.actionsXSmall,
              xxsmall && styles.actionsXXSmall
            )}
          >
            {data.trailer && (
              <Button
                color="primary"
                startIcon={<TelevisionPlay />}
                onClick={() => {
                  setTrailer(buildTrailerUrl(data.trailer));
                }}
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
          </div>
        </div>
      )}
    </div>
  );
};

export default Pick;
