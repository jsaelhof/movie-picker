import React, { useState } from "react";
import isNil from "lodash/isNil";
import orderBy from "lodash/orderBy";

import { MovieList } from "./list-grid.styles";
import { useAppContext } from "../../context/app-context";
import DeleteDialog from "../delete-dialog/delete-dialog";
import Movie from "./movie";
import EmptyList from "./empty-list";

const ListGrid = ({
  movies,
  onRemoveMovie,
  onMarkWatched,
  onEditMovie,
  onAddMovie,
}) => {
  const { order } = useAppContext();
  const [deleteMovie, setDeleteMovie] = useState(null);

  if (!movies) return null;

  return (
    <>
      {movies.length > 0 ? (
        <MovieList>
          {movies &&
            orderBy(movies, [order[0]], [order[1]]).map((movie) => (
              <Movie
                key={movie.id}
                movie={movie}
                onEditMovie={onEditMovie}
                onMarkWatched={onMarkWatched}
                onDeleteMovie={setDeleteMovie}
              />
            ))}
        </MovieList>
      ) : (
        <EmptyList onAddMovie={onAddMovie} />
      )}

      <DeleteDialog
        open={!isNil(deleteMovie)}
        title="Hasta La Vista, Baby"
        content={`'${deleteMovie?.title}' will be removed`}
        onCancel={() => setDeleteMovie(null)}
        onConfirm={() => {
          onRemoveMovie(deleteMovie.id);
          setDeleteMovie(null);
        }}
      />
    </>
  );
};

export default ListGrid;
