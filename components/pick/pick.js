import styles from "./pick.module.css";

import React, { useEffect, useState } from "react";
import axios from "axios";

import MoviePoster from "../movie-poster/movie-poster";
import Ratings from "../ratings/ratings";
import { formatRuntime } from "../../utils/format-runtime";
import { api } from "../../constants/api";
import { genreLabels } from "../../constants/genres";

const Pick = ({ movie }) => {
  const [data, setData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(
        movie.imdbID
          ? api.OMDB_IMDBID.replace("%imdbid%", movie.imdbID)
          : api.OMDB_TITLE.replace("%title%", movie.Title)
      );

      console.log(data);
      setData(data);
    };

    fetchData();
  }, [movie]);

  return (
    <div className={styles.pick}>
      <div className={styles.title}>You&apos;re watching:</div>

      <MoviePoster height={350} movie={movie} className={styles.poster} />

      <div className={styles.details}>
        <div className={styles.movieTitle}>{movie.title}</div>
        <div className={styles.movieData}>
          <div>{formatRuntime(movie.runtime)}</div>
          <div>{movie.year}</div>
          <div>{genreLabels[movie.genre]}</div>
          {data?.Rated && <div>Rated: {data.Rated}</div>}
        </div>
        {data?.Plot && <div className={styles.plot}>{data.Plot}</div>}
        <Ratings ratings={movie.ratings} />
      </div>
    </div>
  );
};

export default Pick;
