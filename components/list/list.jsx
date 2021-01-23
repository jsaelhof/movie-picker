import {Paper} from "@material-ui/core";
import {useState} from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import isNil from "lodash/isNil";
import EyeCheckIcon from "mdi-material-ui/EyeCheck";
import orderBy from "lodash/orderBy";

import {formatRuntime} from "../../utils/format-runtime";
import {genreLabels} from "../../constants/genres";
import {sourceLogos} from "../../constants/sources";
import {titleCase} from "../../utils/title-case";
import ActionButton from "../action-button/action-button";
import EditRow from "../edit-row/edit-row";
import DeleteDialog from "../delete-dialog/delete-dialog";
import ViewAction from "../view-action/view-action";
import ListCell from "../list-cell/list-cell";
import ListHeaderCell from "../list-header-cell/list-header-cell";

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
                  save={(movie) => {
                    add(movie);
                    setEditedMovie(null);
                  }}
                  cancel={() => setEditedMovie(null)}
                />
              ) : (
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
                  <ListCell>
                    {movie.runtime ? formatRuntime(movie.runtime) : "-"}
                  </ListCell>
                  <ListCell>
                    {movie.genre || genreLabels[movie.genre]
                      ? titleCase(genreLabels[movie.genre])
                      : "-"}
                  </ListCell>
                  <ListCell>
                    <img
                      src={sourceLogos[movie.source]}
                      width="40"
                      height="40"
                    />
                  </ListCell>
                  <ListCell>
                    <ViewAction movie={movie} />
                    <ActionButton
                      Icon={EditIcon}
                      tooltip="Edit"
                      movie={movie}
                      onClick={(movie) => {
                        setEditedMovie(
                          movie._id,
                          // movies.find(({_id}) => _id === movie._id),
                        );
                        // setRuntimeInput(
                        //   movie.runtime
                        //     ? formatRuntime(movie.runtime, true)
                        //     : undefined,
                        // );
                      }}
                    />
                    <ActionButton
                      Icon={EyeCheckIcon}
                      tooltip="Mark as Watched"
                      movie={movie}
                      onClick={(movie) => watched(movie)}
                    />
                    <ActionButton
                      Icon={DeleteIcon}
                      tooltip="Delete"
                      movie={movie}
                      onClick={({_id}) => setDeleteMovie(_id)}
                    />
                  </ListCell>
                </>
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
