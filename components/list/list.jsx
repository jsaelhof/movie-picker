import {Paper} from "@material-ui/core";
import {useState} from "react";
import isNil from "lodash/isNil";
import orderBy from "lodash/orderBy";

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
}) => {
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
        <div className={styles.movieList}>
          <ListHeaderRow
            count={movies.length}
            onSort={(column) => setOrder(resolveOrder(column))}
          />

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
              editedMovie && movie._id === editedMovie ? (
                <EditRow
                  movie={movies.find(({_id}) => _id === editedMovie)}
                  onSave={(movie) => {
                    onEditMovie(movie);
                    setEditedMovie(null);
                  }}
                  onCancel={() => setEditedMovie(null)}
                />
              ) : (
                <ListRow
                  movie={movie}
                  onLockMovie={(movie) => onEditMovie(movie)}
                  onEditMovie={({_id}) => setEditedMovie(_id)}
                  onDeleteMovie={({_id}) => setDeleteMovie(_id)}
                  onMarkWatched={(movie) => onMarkWatched(movie)}
                />
              ),
            )}
        </div>
      </Paper>

      <DeleteDialog
        open={!isNil(deleteMovie)}
        title="Delete Movie?"
        content={`'${
          movies.find(({_id}) => _id === deleteMovie)?.title
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
