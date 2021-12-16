import { useState } from "react";
import { format } from "date-fns";
import clsx from "clsx";
import DeleteIcon from "@mui/icons-material/Delete";

import { titleCase } from "../../utils/title-case";
import { useResponsive } from "../../hooks/use-responsive";
import ActionButton from "../action-button/action-button";
import DatePicker from "../date-picker/date-picker";
import ListCell from "./list-cell";

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
  const { minimalColumns, mobile } = useResponsive();
  const [editedMovie, setEditedMovie] = useState(null);

  // If the date is in process of being changed use that otherwise use the date from the movie.
  const watchedDate = new Date(
    isEditing ? editedMovie.watchedOn : movie.watchedOn
  );

  return (
    <>
      <ListCell left classes={clsx(minimalColumns && styles.titleCell)}>
        <a
          className={clsx(styles.link, minimalColumns && styles.title)}
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
        {format(watchedDate, minimalColumns ? "MM/dd/yy" : "EEE, MMM do, yyyy")}

        {isEditing && (
          <DatePicker
            drawer={mobile}
            defaultDate={watchedDate}
            onChange={(day) => {
              setEditedMovie((state) => ({
                ...state,
                watchedOn: day.toISOString(),
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
