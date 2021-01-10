import {Paper} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import clsx from "clsx";
import orderBy from "lodash/orderBy";

import {sourceLogos} from "../../constants/sources";
import {formatRuntime} from "../../utils/format-runtime";
import {titleCase} from "../../utils/title-case";

import styles from "./list.module.css";

const List = ({movies, remove}) =>
  movies ? (
    <Paper className={styles.list}>
      <div className={styles.movieList}>
        <div className={styles.movieListHeader}>Movies</div>
        <div className={clsx(styles.movieListHeader, styles.center)}>
          Runtime
        </div>
        <div className={clsx(styles.movieListHeader, styles.center)}>Genre</div>
        <div className={clsx(styles.movieListHeader, styles.center)}>
          Source
        </div>
        <div className={clsx(styles.movieListHeader, styles.center)}>
          Remove
        </div>

        {movies &&
          orderBy(movies, ["title"]).map((movie) => (
            <>
              <div className={styles.movieCell}>
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
              </div>
              <div className={clsx(styles.movieCell, styles.center)}>
                {movie.runtime ? formatRuntime(movie.runtime) : "-"}
              </div>
              <div className={clsx(styles.movieCell, styles.center)}>
                {movie.genre ? titleCase(movie.genre) : "-"}
              </div>
              <div className={clsx(styles.movieCell, styles.center)}>
                <img src={sourceLogos[movie.source]} width="40" height="40" />
              </div>
              <DeleteIcon
                data-movieId={movie._id}
                className={clsx(styles.movieCell, styles.remove)}
                onClick={({currentTarget}) => {
                  remove(currentTarget.dataset.movieId);
                }}
              />
            </>
          ))}
      </div>
    </Paper>
  ) : null;

export default List;
