import clsx from "clsx";
import isNil from "lodash/isNil";
import React from "react";
import TheatresIcon from "@material-ui/icons/Theaters";

import styles from "./movie-poster.module.css";

const MoviePoster = ({poster, title, year, selected, onClick}) => (
  <div
    className={clsx(
      styles.main,
      !isNil(selected) && !selected && styles.unselected,
    )}
    onClick={onClick}
  >
    <div className={styles.poster}>
      {poster === "N/A" || !poster ? (
        <TheatresIcon fontSize="large" />
      ) : (
        <img src={poster} />
      )}
    </div>
    <div className={styles.title}>{title}</div>
    <div className={styles.year}>{year}</div>
  </div>
);

export default MoviePoster;
