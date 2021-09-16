import styles from "./movie.module.css";

import { Paper } from "@material-ui/core";
import React, { useRef, useState } from "react";
import { animated, useSpring } from "react-spring";
import clsx from "clsx";
import TheatresIcon from "@material-ui/icons/Theaters";

import { formatRuntime } from "../../utils/format-runtime";
import { genreLabels } from "../../constants/genres";
import { sourceLogos } from "../../constants/sources";
import DetailActions from "./detail-actions";
import MoreActions from "./more-actions";
import Ratings from "../ratings/ratings";
import { useResponsive } from "../../hooks/use-responsive";

const Movie = ({ movie, onEditMovie, onMarkWatched }) => {
  const { mobile } = useResponsive();
  const [showMoreActions, setShowMoreActions] = useState(false);
  const [focused, setFocused] = useState(false);
  const timeoutRef = useRef();

  const detailStyles = useSpring({
    from: { transform: "scale(0.67)" },
    to: { transform: `scale(${mobile ? 0.95 : 1})` },
    reverse: !focused,
  });

  const moreActionsStyles = useSpring({
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
        {movie.poster ? (
          <div
            className={clsx(styles.poster, movie.locked && styles.posterLocked)}
            style={{
              backgroundImage: `url(${movie.poster})`,
            }}
          />
        ) : (
          <div
            className={clsx(
              styles.poster,
              styles.noPoster,
              movie.locked && styles.posterLocked
            )}
          >
            <TheatresIcon fontSize="large" />
            <div>{movie.title}</div>
          </div>
        )}
      </div>

      <div
        className={clsx(
          styles.movieDetailPositioner,
          focused && styles.movieDetailShow
        )}
      >
        <animated.div style={detailStyles} className={styles.movieDetail}>
          {movie.poster ? (
            <div
              className={clsx(styles.poster, styles.detailPoster)}
              style={{ backgroundImage: `url(${movie.poster})` }}
            />
          ) : (
            <div className={clsx(styles.poster, styles.noPoster)}>
              <TheatresIcon fontSize="large" />
              <div>{movie.title}</div>
            </div>
          )}
          <div className={styles.source}>
            {<img src={sourceLogos[movie.source]} width="40" height="40" />}
          </div>
          <div className={styles.info}>
            <div className={styles.infoData}>
              <div>{formatRuntime(movie.runtime)}</div>
              <div>{genreLabels[movie.genre]}</div>
            </div>
            <div>
              <Ratings size="small" ratings={movie.ratings} dense />
            </div>
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
          </div>
          {
            <animated.div
              className={styles.moreActions}
              style={moreActionsStyles}
            >
              <MoreActions
                movie={movie}
                onClose={() => setShowMoreActions(false)}
                onDeleteMovie={() => alert("IMPLEMENT DELETE")}
              />
            </animated.div>
          }
        </animated.div>
      </div>
    </Paper>
  );
};

export default Movie;
