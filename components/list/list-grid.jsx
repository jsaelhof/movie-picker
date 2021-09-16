import React, { useState } from "react";
import isNil from "lodash/isNil";
import orderBy from "lodash/orderBy";

import { useAppContext } from "../../context/app-context";
import DeleteDialog from "../delete-dialog/delete-dialog";
import Movie from "./movie";

import styles from "./list-grid.module.css";

const ListGrid = ({ movies, onRemoveMovie, onMarkWatched, onEditMovie }) => {
  const { order } = useAppContext();
  const [deleteMovie, setDeleteMovie] = useState(null);

  if (!movies) return null;

  return (
    <>
      <div className={styles.movieList}>
        {movies &&
          orderBy(movies, [order[0]], [order[1]]).map((movie) => (
            <Movie
              key={movie.id}
              movie={movie}
              onEditMovie={onEditMovie}
              onMarkWatched={onMarkWatched}
            />
          ))}
      </div>

      <DeleteDialog
        open={!isNil(deleteMovie)}
        title="Delete Movie?"
        content={`'${
          movies.find(({ id }) => id === deleteMovie)?.title
        }' will be removed`}
        onCancel={() => setDeleteMovie(null)}
        onConfirm={() => {
          onRemoveMovie(deleteMovie);
          setDeleteMovie(null);
        }}
      />
    </>
  );
};

export default ListGrid;
