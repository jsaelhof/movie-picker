import { Paper } from "@material-ui/core";
import { useState } from "react";
import clsx from "clsx";
import isNil from "lodash/isNil";
import orderBy from "lodash/orderBy";

import { useResponsive } from "../../hooks/use-responsive";
import DeleteDialog from "../delete-dialog/delete-dialog";
import ListHeaderRow from "../list-header-row/list-header-row";
import ListRow from "../list-row/list-row";

import styles from "./list.module.css";

const List = ({
  movies,
  onRemoveMovie,
  onMarkWatched,
  onEditMovie,
  hideHeader,
}) => {
  const { minimalColumns } = useResponsive();

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

          {movies &&
            orderBy(movies, [order[0]], [order[1]]).map((movie) => (
              <ListRow
                key={movie.id}
                movie={movie}
                onLockMovie={(movie) => onEditMovie(movie, false)}
                onEditMovie={(movie) => onEditMovie(movie)}
                onMarkWatched={(movie) => onMarkWatched(movie)}
                onDeleteMovie={({ id }) => {
                  setDeleteMovie(id);
                }}
              />
            ))}
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
