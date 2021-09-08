import { Paper } from "@material-ui/core";
import React, { useState } from "react";
import { animated, useSpring } from "react-spring";
import clsx from "clsx";
import has from "lodash/has";
import isNil from "lodash/isNil";
import orderBy from "lodash/orderBy";
import map from "lodash/map";
import EditIcon from "@material-ui/icons/Edit";
import EyeCheckIcon from "mdi-material-ui/EyeCheck";
import TheatresIcon from "@material-ui/icons/Theaters";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";

import { useResponsive } from "../../hooks/use-responsive";
import DeleteDialog from "../delete-dialog/delete-dialog";
import { formatRuntime } from "../../utils/format-runtime";
import { genreLabels } from "../../constants/genres";
import ActionButton from "../action-button/action-button";
import { ratingsSource, ratingsSourceImage } from "../../constants/ratings";
import { usePrevious } from "../../hooks/use-previous";
import { sourceLogos } from "../../constants/sources";

import styles from "./list-grid.module.css";
import MoreActions from "./more-actions";
import { useRef } from "react";
import Lock from "../lock/lock";

// 160 is poster width, 16 is gap.
// Make these constants for the CSS.
const calcNumColumns = (w, n = 1) => {
  if (!w || w <= 160) return 1;

  if (160 + n * (160 + 16) < w) {
    return calcNumColumns(w, n + 1);
  } else {
    return n;
  }
};

const ListGrid = ({ movies, onRemoveMovie, onMarkWatched, onEditMovie }) => {
  // const { minimalColumns } = useResponsive();

  const gridRef = useRef();
  const [showExtraActions, setShowExtraActions] = useState(false);
  const [order, setOrder] = useState(["addedOn", "desc"]);
  const [deleteMovie, setDeleteMovie] = useState(null);

  const [focusedMovie, setFocusedMovie] = useState(null);

  const prevFocusedMovieId = usePrevious(focusedMovie?.id);

  const detailStyles = useSpring({
    from: { transform: "scale(0.8)" },
    to: { transform: "scale(1)" },
    reset: !prevFocusedMovieId || prevFocusedMovieId !== focusedMovie?.id,
  });

  const moreActionsStyles = useSpring({
    to: { transform: `translateY(${showExtraActions ? -100 : 0}%)` },
  });

  if (!movies) return null;

  const resolveOrder = (key) => [
    key,
    key !== order[0] ? "asc" : order[1] === "asc" ? "desc" : "asc",
  ];

  const numColumns = calcNumColumns(gridRef.current?.clientWidth);
  const zoomsWillOverflow =
    window.innerWidth - gridRef.current?.clientWidth < 40;

  return (
    <>
      <div className={styles.movieList} ref={gridRef}>
        {movies &&
          orderBy(movies, [order[0]], [order[1]]).map((movie, i) => (
            <Paper
              key={movie.id}
              className={clsx(
                styles.movieWrapper,
                focusedMovie?.id === movie.id && styles.movieWrapperFocus
              )}
              onMouseEnter={() => {
                setTimeout(() => {
                  setFocusedMovie(movie);
                }, 250);
              }}
              onMouseLeave={() => {
                setShowExtraActions(false);
                setFocusedMovie(null);
              }}
            >
              <div className={styles.movie}>
                {movie.poster ? (
                  <div
                    className={clsx(
                      styles.poster,
                      movie.locked && styles.posterLocked
                    )}
                    style={{
                      backgroundImage: `url(${movie.poster})`,
                    }}
                  />
                ) : (
                  <div
                    className={clsx(
                      styles.poster,
                      styles.noPoster,
                      movie.locked && styles.posterLocked
                    )}
                  >
                    <TheatresIcon fontSize="large" />
                    <div>{movie.title}</div>
                  </div>
                )}
              </div>

              {focusedMovie?.id === movie.id && (
                <div
                  className={clsx(
                    styles.movieDetailPositioner,
                    zoomsWillOverflow &&
                      i % numColumns === 0 &&
                      styles.firstInRow,
                    zoomsWillOverflow &&
                      i % numColumns === numColumns - 1 &&
                      styles.lastInRow
                  )}
                >
                  <animated.div
                    style={detailStyles}
                    className={styles.movieDetail}
                  >
                    {movie.poster ? (
                      <div
                        className={styles.poster}
                        style={{ backgroundImage: `url(${movie.poster})` }}
                      />
                    ) : (
                      <div className={clsx(styles.poster, styles.noPoster)}>
                        <TheatresIcon fontSize="large" />
                        <div>{movie.title}</div>
                      </div>
                    )}
                    <div className={styles.source}>
                      {
                        <img
                          src={sourceLogos[movie.source]}
                          width="40"
                          height="40"
                        />
                      }
                    </div>
                    <div className={styles.info}>
                      <div className={styles.infoData}>
                        <div>{formatRuntime(movie.runtime)}</div>
                        <div>{genreLabels[movie.genre]}</div>
                      </div>
                      <div>
                        <ul className={styles.ratings}>
                          {map(movie.ratings, (rating, source) =>
                            has(ratingsSource, source) && rating ? (
                              <li key={source}>
                                <img
                                  src={`/images/ratings/${
                                    ratingsSourceImage[ratingsSource[source]]
                                  }`}
                                  className={styles.ratingsSourceIcon}
                                />
                                {rating}
                              </li>
                            ) : null
                          )}
                        </ul>
                      </div>
                      <div className={styles.infoActions}>
                        <ActionButton
                          Icon={EditIcon}
                          tooltip="Edit"
                          movie={movie}
                          onClick={() => {
                            setFocusedMovie(null);
                            onEditMovie(movie);
                          }}
                        />
                        <ActionButton
                          Icon={EyeCheckIcon}
                          tooltip="Mark as Watched"
                          movie={movie}
                          onClick={() => {
                            setFocusedMovie(null);
                            onMarkWatched(movie);
                          }}
                        />
                        <Lock
                          locked={movie.locked}
                          onToggleLock={(locked) => {
                            onEditMovie({ ...movie, locked }, false);
                          }}
                        />
                        <div /> {/* Spacer in the grid */}
                        <ActionButton
                          Icon={MoreHorizIcon}
                          tooltip="More Actions"
                          movie={movie}
                          onClick={() => {
                            setShowExtraActions(true);
                          }}
                        />
                      </div>
                    </div>
                    {
                      <animated.div
                        className={styles.moreActions}
                        style={moreActionsStyles}
                      >
                        <MoreActions
                          movie={movie}
                          onClose={() => setShowExtraActions(false)}
                          onDeleteMovie={() => alert("IMPLEMENT DELETE")}
                        />
                      </animated.div>
                    }
                  </animated.div>
                </div>
              )}
            </Paper>
          ))}
      </div>

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

export default ListGrid;
