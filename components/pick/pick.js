import styles from "./pick.module.css";

import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import clsx from "clsx";

import { formatRuntime } from "../../utils/format-runtime";
import { api } from "../../constants/api";
import { genreLabels } from "../../constants/genres";
import { searchTMDB } from "../../utils/search";
import { useResponsive } from "../../hooks/use-responsive";
import Rated from "./rated";
import MoviePoster from "../movie-poster/movie-poster";
import Ratings from "../ratings/ratings";

const Pick = ({ movie }) => {
  const { small, minimalColumns } = useResponsive();
  const [data, setData] = useState(null);

  const search = useCallback(() => {
    window.open(searchTMDB(movie.title), "moviedb");
  }, [movie]);

  useEffect(() => {
    const fetchData = async () => {
      setData(null);

      if (movie.imdbID) {
        const { data } = await axios.get(
          api.OMDB_IMDBID.replace("%imdbid%", movie.imdbID)
        );
        setData(data);
      }
    };

    fetchData();
  }, [movie]);

  return (
    <div className={clsx(styles.pick, small && styles.pickStacked)}>
      <div className={styles.title}>You&apos;re watching</div>

      <MoviePoster
        height={minimalColumns ? 250 : 350}
        movie={movie}
        className={styles.poster}
        onClick={search}
      />

      <div className={clsx(styles.details, small && styles.detailsCentered)}>
        <div
          className={clsx(
            styles.movieTitle,
            small && styles.movieTitleCentered
          )}
          onClick={search}
        >
          {movie.title}
        </div>
        <div className={styles.movieData}>
          <div>{formatRuntime(movie.runtime)}</div>
          <div>{movie.year}</div>
          <div>{genreLabels[movie.genre]}</div>
          {data?.Rated && <Rated rated={data.Rated} />}
        </div>
        {data?.Plot && <div className={styles.plot}>{data.Plot}</div>}
        <Ratings ratings={movie.ratings} />
      </div>
    </div>
  );
};

export default Pick;
