import {format} from "date-fns";
import {Paper} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import orderBy from "lodash/orderBy";

import {titleCase} from "../../utils/title-case";
import ListCell from "./list-cell";
import ListHeaderCell from "./list-header-cell";

import styles from "./watched-list.module.css";

const WatchedList = ({movies, remove}) => {
  return movies ? (
    <Paper className={styles.list}>
      <div className={styles.movieList}>
        <ListHeaderCell left>Watched Movies</ListHeaderCell>
        <ListHeaderCell left>Date</ListHeaderCell>
        <ListHeaderCell>Actions</ListHeaderCell>

        {movies &&
          orderBy(movies, ["watched"], ["desc"]).map((movie) => (
            <>
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
                <DeleteIcon
                  data-movieId={movie._id}
                  className={styles.action}
                  onClick={({currentTarget}) => {
                    remove(currentTarget.dataset.movieId);
                  }}
                />
              </ListCell>
            </>
          ))}
      </div>
    </Paper>
  ) : null;
};

export default WatchedList;
