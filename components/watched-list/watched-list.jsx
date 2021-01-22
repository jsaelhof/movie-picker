import {useState} from "react";
import {format} from "date-fns";
import {Paper, Tooltip} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import isNil from "lodash/isNil";
import orderBy from "lodash/orderBy";

import {titleCase} from "../../utils/title-case";
import DeleteDialog from "../delete-dialog/delete-dialog";
import ListCell from "../list-cell/list-cell";
import ListHeaderCell from "../list-header-cell/list-header-cell";

import styles from "./watched-list.module.css";

const WatchedList = ({movies, remove}) => {
  const [deleteMovie, setDeleteMovie] = useState(null);

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
              <React.Fragment key={movie._id}>
                <ListCell left>
                  <a
                    className={styles.link}
                    href={`https://www.themoviedb.org/search?query=${movie.title.replace(
                      " ",
                      "+",
                    )}`}
                    target="moviedb"
                  >
                    {titleCase(movie.title)}
                  </a>
                </ListCell>
                <ListCell left>
                  {movie.watched
                    ? format(new Date(movie.watched), "MMM Do, yyyy")
                    : "-"}
                </ListCell>
                <ListCell>
                  <Tooltip title="Delete">
                    <DeleteIcon
                      data-movie-id={movie._id}
                      className={styles.action}
                      onClick={({currentTarget}) => {
                        setDeleteMovie(currentTarget.dataset.movieId);
                      }}
                    />
                  </Tooltip>
                </ListCell>
              </React.Fragment>
            ))}
        </div>
      </Paper>

      <DeleteDialog
        open={!isNil(deleteMovie)}
        title="Remove Watched Movie?"
        content={`'${
          movies.find(({_id}) => _id === deleteMovie)?.title
        }' will be removed from the Watched Movies list`}
        onCancel={() => setDeleteMovie(null)}
        onConfirm={() => {
          remove(deleteMovie);
          setDeleteMovie(null);
        }}
      />
    </>
  ) : null;
};

export default WatchedList;
