import clsx from "clsx";
import isNil from "lodash/isNil";
import React from "react";
import TheatresIcon from "@material-ui/icons/Theaters";

import styles from "./movie-poster.module.css";

const MoviePoster = ({
  poster,
  title,
  year,
  selected,
  onClick,
  height = 200,
}) => (
  <div
    className={clsx(
      styles.main,
      onClick && styles.mainInteraction,
      !isNil(selected) && !selected && styles.unselected
    )}
    onClick={onClick}
  >
    <div className={styles.poster} style={{ height }}>
      {poster === "N/A" || !poster ? (
        <TheatresIcon fontSize="large" />
      ) : (
        <img src={poster} />
      )}
    </div>
    {title && <div className={styles.title}>{title}</div>}
    {year && <div className={styles.year}>{year}</div>}
  </div>
);

export default MoviePoster;
