import React, {useEffect, useState} from "react";
import {TextField} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import DoneIcon from "@material-ui/icons/Done";

import {formatRuntime} from "../../utils/format-runtime";
import {genreLabels, genres} from "../../constants/genres";
import {sourceLabels, sourceLogos, sources} from "../../constants/sources";
import ActionButton from "../action-button/action-button";
import EditCell from "../edit-cell/edit-cell";
import ListSelect from "../list-select/list-select";

import styles from "./edit-row.module.css";

const EditRow = ({movie, onSave, onCancel}) => {
  const [runtimeInput, setRuntimeInput] = useState(
    movie.runtime ? formatRuntime(movie.runtime, true) : undefined,
  );
  const [editedMovie, setEditedMovie] = useState(movie);

  return (
    <>
      <EditCell />
      <EditCell left dense>
        <TextField
          required
          id="title"
          label="Title"
          value={editedMovie.title}
          margin="dense"
          fullWidth
          variant="outlined"
          placeholder="Title"
          onChange={({target}) =>
            setEditedMovie({...editedMovie, title: target.value})
          }
          autoFocus
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
          onChange={(value) => setEditedMovie({...editedMovie, genre: value})}
          value={editedMovie.genre}
          values={genres}
          labels={genreLabels}
        />
      </EditCell>
      <EditCell dense>
        <ListSelect
          id="source"
          onChange={(value) => setEditedMovie({...editedMovie, source: value})}
          value={editedMovie.source}
          values={sources}
          labels={sourceLabels}
          images={sourceLogos}
        />
      </EditCell>
      <EditCell>
        <ActionButton
          className={styles.editDone}
          Icon={DoneIcon}
          tooltip="Save"
          onClick={() => {
            let runtime;

            // Convert the runtime input to seconds
            if (!runtimeInput || runtimeInput === "") {
              runtime = editedMovie.runtime;
            } else {
              const [hours, minutes] = runtimeInput.includes(":")
                ? runtimeInput.split(":")
                : [0, runtimeInput];

              runtime =
                (hours ? hours * 3600 : 0) + (minutes ? minutes * 60 : 0);
            }

            onSave({
              ...editedMovie,
              runtime,
            });
          }}
        />
        <ActionButton
          className={styles.editCancel}
          Icon={CloseIcon}
          tooltip="Cancel"
          onClick={onCancel}
        />
      </EditCell>
    </>
  );
};

export default EditRow;
