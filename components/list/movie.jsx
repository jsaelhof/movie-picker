import styles from "./movie.module.css";

import { Paper } from "@material-ui/core";
import React, { useRef, useState } from "react";
import { animated, useSpring } from "react-spring";
import clsx from "clsx";

import { formatRuntime } from "../../utils/format-runtime";
import { sourceLogos } from "../../constants/sources";
import { useResponsive } from "../../hooks/use-responsive";
import DetailActions from "./detail-actions";
import MoreActions from "./more-actions";
import Ratings from "../ratings/ratings";
import MoviePoster from "../movie-poster/movie-poster";

const Movie = ({ movie, onEditMovie, onMarkWatched, onDeleteMovie }) => {
  const { mobile } = useResponsive();
  const [showMoreActions, setShowMoreActions] = useState(false);
  const [focused, setFocused] = useState(false);
  const timeoutRef = useRef();

  const detailSpring = useSpring({
    from: { transform: "scale(0.67)" },
    to: { transform: `scale(${mobile ? 0.95 : 1})` },
    reverse: !focused,
  });

  const infoSpring = useSpring({
    from: { marginTop: -80 },
    to: { marginTop: 0 },
    reverse: !focused,
  });

  const moreActionsSpring = useSpring({
    to: { transform: `translateY(${showMoreActions ? -100 : 0}%)` },
  });

  return (
    <Paper
      key={movie.id}
      className={clsx(styles.movieWrapper, focused && styles.movieWrapperFocus)}
      onMouseEnter={() => {
        timeoutRef.current = setTimeout(() => {
          setFocused(true);
        }, 250);
      }}
      onMouseLeave={() => {
        clearTimeout(timeoutRef.current);
        setShowMoreActions(false);
        setFocused(false);
      }}
    >
      <div className={styles.movie}>
        <MoviePoster movie={movie} />
      </div>

      <div
        className={clsx(
          styles.movieDetailPositioner,
          focused && styles.movieDetailShow
        )}
      >
        <animated.div style={detailSpring} className={styles.movieDetail}>
          <div className={styles.overflowWrapper}>
            <MoviePoster
              movie={movie}
              height={375}
              className={styles.detailPoster}
            />

            <div className={styles.source}>
              {<img src={sourceLogos[movie.source]} width="40" height="40" />}
            </div>

            <animated.div className={styles.info} style={infoSpring}>
              <div className={styles.infoData}>
                <div>{formatRuntime(movie.runtime)}</div>
                <div>{movie.year}</div>
              </div>

              <Ratings
                size="small"
                ratings={movie.ratings}
                dense
                className={styles.infoRatings}
              />

              <DetailActions
                movie={movie}
                onEdit={() => {
                  setFocused(false);
                  onEditMovie(movie);
                }}
                onMarkWatched={() => {
                  setFocused(false);
                  onMarkWatched(movie);
                }}
                onToggleLock={(locked) => {
                  onEditMovie({ ...movie, locked }, false);
                }}
                onMoreActions={() => {
                  setShowMoreActions(true);
                }}
              />
            </animated.div>

            {
              <animated.div
                className={clsx(
                  styles.moreActions,
                  showMoreActions && styles.enableMoreActions
                )}
                style={moreActionsSpring}
              >
                <MoreActions
                  movie={movie}
                  onClose={() => setShowMoreActions(false)}
                  onDeleteMovie={() => onDeleteMovie(movie)}
                />
              </animated.div>
            }
          </div>
        </animated.div>
      </div>
    </Paper>
  );
};

export default Movie;
