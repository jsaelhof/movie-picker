import { useState } from "react";
import { format } from "date-fns";
import DeleteIcon from "@material-ui/icons/Delete";

import { titleCase } from "../../utils/title-case";
import ActionButton from "../action-button/action-button";
import DatePicker from "../date-picker/date-picker";
import ListCell from "../list-cell/list-cell";

import styles from "./watched-list-row.module.css";

const DATE_CELL_ID = "dateCell";

const WatchedListRow = ({
  movie,
  isEditing,
  onEditMovie,
  onSave,
  onCancel,
  onDelete,
}) => {
  const [editedMovie, setEditedMovie] = useState(null);

  // If the date is in process of being changed use that otherwise use the date from the movie.
  const watchedDate = new Date(isEditing ? editedMovie.watched : movie.watched);

  return (
    <>
      <ListCell left>
        <a
          className={styles.link}
          href={`https://www.themoviedb.org/search?query=${movie.title.replace(
            " ",
            "+"
          )}`}
          target="moviedb"
        >
          {titleCase(movie.title)}
        </a>
      </ListCell>
      <ListCell
        data-id={DATE_CELL_ID}
        classes={styles.dateCell}
        left
        onClick={({ target }) => {
          // Make sure the click is not on a child element (the date picker elements)
          if (target.dataset.id === DATE_CELL_ID) {
            setEditedMovie({ ...movie });
            onEditMovie(movie);
          }
        }}
      >
        {format(watchedDate, "MMM do, yyyy")}

        {isEditing && (
          <DatePicker
            defaultDate={watchedDate}
            onChange={(day) => {
              setEditedMovie((state) => ({
                ...state,
                watched: day.toISOString(),
              }));
            }}
            onSave={() => {
              onSave(editedMovie);
              setEditedMovie(null);
            }}
            onCancel={() => {
              onCancel();
              setEditedMovie(null);
            }}
          />
        )}
      </ListCell>
      <ListCell>
        <ActionButton
          Icon={DeleteIcon}
          tooltip="Delete"
          movie={movie}
          onClick={onDelete}
        />
      </ListCell>
    </>
  );
};

export default WatchedListRow;
