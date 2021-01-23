import {Paper} from "@material-ui/core";
import {useState} from "react";
import isNil from "lodash/isNil";
import orderBy from "lodash/orderBy";

import EditRow from "../edit-row/edit-row";
import DeleteDialog from "../delete-dialog/delete-dialog";
import ListHeaderCell from "../list-header-cell/list-header-cell";
import ListRow from "../list-row/list-row";

import styles from "./list.module.css";

const List = ({movies, add, remove, watched}) => {
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
          <ListHeaderCell
            left
            onClick={() => setOrder(resolveOrder("title"))}
          >{`Movies (${movies.length})`}</ListHeaderCell>
          <ListHeaderCell onClick={() => setOrder(resolveOrder("runtime"))}>
            Runtime
          </ListHeaderCell>
          <ListHeaderCell onClick={() => setOrder(resolveOrder("genre"))}>
            Genre
          </ListHeaderCell>
          <ListHeaderCell>Source</ListHeaderCell>
          <ListHeaderCell>Actions</ListHeaderCell>

          {movies &&
            orderBy(movies, [order[0]], [order[1]]).map((movie) =>
              editedMovie && movie._id === editedMovie ? (
                <EditRow
                  movie={movies.find(({_id}) => _id === editedMovie)}
                  onSave={(movie) => {
                    add(movie);
                    setEditedMovie(null);
                  }}
                  onCancel={() => setEditedMovie(null)}
                />
              ) : (
                <ListRow
                  movie={movie}
                  onEditMovie={({_id}) => setEditedMovie(_id)}
                  onDeleteMovie={({_id}) => setDeleteMovie(_id)}
                  onMarkWatched={(movie) => watched(movie)}
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
          remove(deleteMovie);
          setDeleteMovie(null);
        }}
      />
    </>
  );
};

export default List;
