import { Paper } from "@material-ui/core";
import { useState } from "react";
import clsx from "clsx";
import isNil from "lodash/isNil";
import orderBy from "lodash/orderBy";

import { useResponsive } from "../../hooks/use-responsive";
import DeleteDialog from "../delete-dialog/delete-dialog";
import EditRow from "../edit-row/edit-row";
import ListHeaderRow from "../list-header-row/list-header-row";
import ListRow from "../list-row/list-row";

import styles from "./list.module.css";

const List = ({
  movies,
  enableAddMovie,
  onAddMovie,
  onAddingComplete,
  onRemoveMovie,
  onMarkWatched,
  onEditMovie,
  hideHeader,
}) => {
  const { minimalColumns } = useResponsive();

  const [editedMovie, setEditedMovie] = useState(null);
  const [order, setOrder] = useState(["addedOn", "desc"]);
  const [deleteMovie, setDeleteMovie] = useState(null);

  if (!movies) return null;

  const resolveOrder = (key) => [
    key,
    key !== order[0] ? "asc" : order[1] === "asc" ? "desc" : "asc",
  ];

  return (
    <>
      <Paper className={styles.list}>
        <div
          className={clsx(
            styles.movieList,
            minimalColumns && styles.minimalColumns
          )}
        >
          {!hideHeader && (
            <ListHeaderRow
              count={movies.length}
              onSort={(column) => setOrder(resolveOrder(column))}
            />
          )}

          {enableAddMovie && (
            <EditRow
              movie={{}}
              onSave={(movie) => {
                onAddMovie(movie);
                onAddingComplete();
              }}
              onCancel={onAddingComplete}
            />
          )}

          {movies &&
            orderBy(movies, [order[0]], [order[1]]).map((movie) =>
              editedMovie && movie.id === editedMovie ? (
                <EditRow
                  key={movie.id}
                  movie={movies.find(({ id }) => id === editedMovie)}
                  onSave={(movie) => {
                    onEditMovie(movie);
                    setEditedMovie(null);
                  }}
                  onCancel={() => setEditedMovie(null)}
                />
              ) : (
                <ListRow
                  key={movie.id}
                  movie={movie}
                  onLockMovie={(movie) => onEditMovie(movie)}
                  onEditMovie={({ id }) => setEditedMovie(id)}
                  onMarkWatched={(movie) => onMarkWatched(movie)}
                  onDeleteMovie={({ id }) => {
                    setDeleteMovie(id);
                  }}
                />
              )
            )}
        </div>
      </Paper>

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

export default List;
