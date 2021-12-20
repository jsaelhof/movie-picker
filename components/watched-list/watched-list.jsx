import { useState } from "react";
import isNil from "lodash/isNil";
import orderBy from "lodash/orderBy";

import { List, ListContainer } from "./watched-list.styles";
import DeleteDialog from "../delete-dialog/delete-dialog";
import ListHeaderCell from "./list-header-cell";
import WatchedListRow from "./watched-list-row";

const WatchedList = ({ movies, onEditMovie, onRemoveMovie }) => {
  const [deleteMovie, setDeleteMovie] = useState(null);
  const [editedMovie, setEditedMovie] = useState(null);

  return movies ? (
    <>
      <ListContainer>
        <List>
          <ListHeaderCell
            left
          >{`Watched Movies (${movies.length})`}</ListHeaderCell>
          <ListHeaderCell left>Date</ListHeaderCell>
          <ListHeaderCell>Actions</ListHeaderCell>

          {movies &&
            orderBy(movies, ["watchedOn"], ["desc"]).map((movie) => (
              <WatchedListRow
                key={movie.id}
                movie={movie}
                isEditing={editedMovie === movie.id}
                onEditMovie={({ id }) => setEditedMovie(id)}
                onSave={(movie) => {
                  onEditMovie(movie);
                  setEditedMovie(null);
                }}
                onCancel={() => setEditedMovie(null)}
                onDelete={({ id }) => {
                  setDeleteMovie(id);
                }}
              />
            ))}
        </List>
      </ListContainer>

      <DeleteDialog
        open={!isNil(deleteMovie)}
        title="Remove Watched Movie?"
        content={`'${
          movies.find(({ id }) => id === deleteMovie)?.title
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
