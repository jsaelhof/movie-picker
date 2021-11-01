import styles from "./movie-poster.module.css";

import React from "react";
import clsx from "clsx";
import TheatresIcon from "@mui/icons-material/Theaters";

const MoviePoster = ({
  movie,
  height = 250,
  borderRadius = 4,
  onClick,
  className,
}) => {
  const width = height * 0.64;

  const posterStyles = {
    width,
    height,
    borderRadius,
  };

  return movie.poster ? (
    <div
      className={clsx(
        styles.poster,
        movie.locked && styles.posterLocked,
        onClick && styles.active,
        className
      )}
      style={{
        ...posterStyles,
        backgroundImage: `url(${movie.poster})`,
      }}
      onClick={onClick}
    />
  ) : (
    <div
      className={clsx(
        styles.poster,
        styles.noPoster,
        onClick && styles.active,
        movie.locked && styles.posterLocked,
        className
      )}
      style={posterStyles}
      onClick={onClick}
    >
      <TheatresIcon fontSize="large" />
      <div>{movie.title}</div>
    </div>
  );
};

export default MoviePoster;
