import { useState } from "react";
import { Paper } from "@material-ui/core";
import isNil from "lodash/isNil";
import orderBy from "lodash/orderBy";

import DeleteDialog from "../delete-dialog/delete-dialog";
import ListHeaderCell from "../list-header-cell/list-header-cell";
import WatchedListRow from "../watched-list-row/watched-list-row";

import styles from "./watched-list.module.css";

const WatchedList = ({ movies, onEditMovie, onRemoveMovie }) => {
  const [deleteMovie, setDeleteMovie] = useState(null);
  const [editedMovie, setEditedMovie] = useState(null);

  return movies ? (
    <>
      <Paper className={styles.list}>
        <div className={styles.movieList}>
          <ListHeaderCell
            left
          >{`Watched Movies (${movies.length})`}</ListHeaderCell>
          <ListHeaderCell left>Date</ListHeaderCell>
          <ListHeaderCell>Actions</ListHeaderCell>

          {movies &&
            orderBy(movies, ["watched"], ["desc"]).map((movie) => (
              <WatchedListRow
                key={movie._id}
                movie={movie}
                isEditing={editedMovie === movie._id}
                onEditMovie={({ _id }) => setEditedMovie(_id)}
                onSave={(movie) => {
                  onEditMovie(movie);
                  setEditedMovie(null);
                }}
                onCancel={() => setEditedMovie(null)}
                onDelete={({ _id }) => {
                  setDeleteMovie(_id);
                }}
              />
            ))}
        </div>
      </Paper>

      <DeleteDialog
        open={!isNil(deleteMovie)}
        title="Remove Watched Movie?"
        content={`'${
          movies.find(({ _id }) => _id === deleteMovie)?.title
        }' will be removed from the Watched Movies list`}
        onCancel={() => setDeleteMovie(null)}
        onConfirm={() => {
          onRemoveMovie(deleteMovie);
          setDeleteMovie(null);
        }}
      />
    </>
  ) : null;
};

export default WatchedList;
