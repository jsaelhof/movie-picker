import React, { useState } from "react";
import { styled } from "@mui/material";
import isNil from "lodash/isNil";
import orderBy from "lodash/orderBy";

import { useAppContext } from "../../context/app-context";
import DeleteDialog from "../delete-dialog/delete-dialog";
import Movie from "./movie";

const ListGrid = ({ movies, onRemoveMovie, onMarkWatched, onEditMovie }) => {
  const { order } = useAppContext();
  const [deleteMovie, setDeleteMovie] = useState(null);

  if (!movies) return null;

  return (
    <>
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

const MovieList = styled("div")`
  display: grid;
  grid-template-columns: repeat(auto-fill, 160px);
  gap: ${({ theme: { spacing } }) => spacing(2)};
  margin-top: ${({ theme: { spacing } }) => spacing(3)};
  margin-bottom: 200px;
  justify-content: center;
`;

export default ListGrid;
