import {Paper, TextField, Tooltip} from "@material-ui/core";
import {useState} from "react";
import CloseIcon from "@material-ui/icons/Close";
import DeleteIcon from "@material-ui/icons/Delete";
import DoneIcon from "@material-ui/icons/Done";
import EditIcon from "@material-ui/icons/Edit";
import isNil from "lodash/isNil";
import EyeCheckIcon from "mdi-material-ui/EyeCheck";
import orderBy from "lodash/orderBy";

import {formatRuntime} from "../../utils/format-runtime";
import {genreLabels, genres} from "../../constants/genres";
import {sourceLabels, sourceLogos, sources} from "../../constants/sources";
import {titleCase} from "../../utils/title-case";
import EditCell from "../edit-cell/edit-cell";
import ListCell from "../list-cell/list-cell";
import ListHeaderCell from "../list-header-cell/list-header-cell";
import ListSelect from "../list-select/list-select";

import styles from "./list.module.css";
import DeleteDialog from "../delete-dialog/delete-dialog";
import ViewAction from "../view-action/view-action";

const List = ({movies, add, remove, watched}) => {
  const [editing, setEditing] = useState(null);
  const [runtimeInput, setRuntimeInput] = useState(null);
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
              editing && movie._id === editing._id ? (
                <>
                  <EditCell left dense>
                    <TextField
                      required
                      id="title"
                      label="Title"
                      value={editing.title}
                      margin="dense"
                      fullWidth
                      variant="outlined"
                      placeholder="Title"
                      onChange={({target}) =>
                        setEditing({...editing, title: target.value})
                      }
                    />
                  </EditCell>
                  <EditCell dense>
                    <TextField
                      id="runtime"
                      label="Runtime"
                      value={runtimeInput}
                      margin="dense"
                      variant="outlined"
                      placeholder="0:00"
                      inputProps={{
                        maxlength: 4,
                      }}
                      onChange={({target}) => setRuntimeInput(target.value)}
                    />
                  </EditCell>
                  <EditCell dense>
                    <ListSelect
                      id="genre"
                      onChange={(value) =>
                        setEditing({...editing, genre: value})
                      }
                      value={editing.genre}
                      values={genres}
                      labels={genreLabels}
                    />
                  </EditCell>
                  <EditCell dense>
                    <ListSelect
                      id="source"
                      onChange={(value) =>
                        setEditing({...editing, source: value})
                      }
                      value={editing.source}
                      values={sources}
                      labels={sourceLabels}
                      images={sourceLogos}
                    />
                  </EditCell>
                  <EditCell>
                    <DoneIcon
                      className={styles.action}
                      onClick={() => {
                        let runtime;

                        // Convert the runtime input to seconds
                        if (!runtimeInput || runtimeInput === "") {
                          runtime = editing.runtime;
                        } else {
                          const [hours, minutes] = runtimeInput.includes(":")
                            ? runtimeInput.split(":")
                            : [0, runtimeInput];

                          runtime =
                            (hours ? hours * 3600 : 0) +
                            (minutes ? minutes * 60 : 0);
                        }

                        add({
                          ...editing,
                          runtime,
                        });
                        setEditing(null);
                      }}
                    />
                    <CloseIcon
                      className={styles.action}
                      onClick={() => setEditing(null)}
                    />
                  </EditCell>
                </>
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
                    <ViewAction
                      title={movie.title}
                      source={movie.source}
                      className={styles.action}
                    />
                    <Tooltip title="Edit">
                      <EditIcon
                        data-movie-id={movie._id}
                        className={styles.action}
                        onClick={({currentTarget}) => {
                          const movieId = currentTarget.dataset.movieId;
                          setEditing(movies.find(({_id}) => _id === movieId));
                          setRuntimeInput(
                            movie.runtime
                              ? formatRuntime(movie.runtime, true)
                              : undefined,
                          );
                        }}
                      />
                    </Tooltip>
                    <Tooltip title="Mark as Watched">
                      <EyeCheckIcon
                        data-movie={JSON.stringify(movie)}
                        className={styles.action}
                        onClick={({currentTarget}) =>
                          watched(JSON.parse(currentTarget.dataset.movie))
                        }
                      />
                    </Tooltip>
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
