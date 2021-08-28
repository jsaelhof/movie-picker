import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  useMediaQuery,
} from "@material-ui/core";
import clsx from "clsx";
import React, { useState } from "react";

import { genreLabels, genres } from "../../constants/genres";
import { sourceLabels, sourceLogos, sources } from "../../constants/sources";
import { parseRuntime } from "../../utils/parse-runtime";
import ListSelect from "../list-select/list-select";
import MoviePoster from "./movie-poster";

import styles from "./add-movie-dialog.module.css";
import { formatRuntime } from "../../utils/format-runtime";

const EditMovieDialog = ({ movie: initialMovie, onEditMovie, onCancel }) => {
  const [titleInput, setTitleInput] = useState(initialMovie.title);
  const [runtimeInput, setRuntimeInput] = useState(
    formatRuntime(initialMovie.runtime, true) || ""
  );
  const [genre, setGenre] = useState(initialMovie.genre || null);
  const [source, setSource] = useState(initialMovie.source || null);
  const [poster, setPoster] = useState(null);
  // const [ratings, setRatings] = useState(null);

  const medium = useMediaQuery("(max-width: 1100px)");
  const small = useMediaQuery("(max-width: 795px)");
  const xsmall = useMediaQuery("(max-width: 600px), (max-height: 414px)");

  return (
    <Dialog open={true} fullWidth fullScreen={xsmall} maxWidth="lg">
      <DialogTitle>Add a Movie</DialogTitle>
      <DialogContent>
        <div
          className={clsx(
            styles.input,
            medium && styles.mediumInput,
            small && styles.smallInput,
            xsmall && styles.xsmallInput
          )}
        >
          <MoviePoster
            poster={poster}
            height={xsmall ? 130 : undefined}
            className={styles.poster}
          />
          <TextField
            className={styles.title}
            label="Title"
            value={titleInput}
            margin="dense"
            fullWidth
            variant="outlined"
            placeholder="Title"
            onChange={({ target }) => {
              setTitleInput(target.value);
            }}
            autoFocus
          />

          <TextField
            className={styles.runtime}
            label="Runtime"
            value={runtimeInput || ""}
            margin="dense"
            variant="outlined"
            placeholder="0:00"
            inputProps={{
              maxlength: 4,
            }}
            onChange={({ target }) => setRuntimeInput(target.value)}
          />

          <ListSelect
            className={styles.genre}
            onChange={(value) => setGenre(value)}
            value={genre}
            values={genres}
            labels={genreLabels}
          />

          <ListSelect
            className={styles.source}
            onChange={(value) => setSource(value)}
            value={source}
            values={sources}
            labels={sourceLabels}
            images={sourceLogos}
          />

          {/* {ratings && <Ratings ratings={ratings} className={styles.ratings} />} */}
        </div>

        <DialogActions>
          <Button onClick={onCancel} variant="outlined">
            Cancel
          </Button>
          <Button
            onClick={() =>
              onEditMovie({
                ...initialMovie,
                title: titleInput,
                runtime: parseRuntime(runtimeInput),
                genre,
                source,
              })
            }
            color="primary"
            variant="contained"
            disabled={titleInput.length === 0}
          >
            Save Movie
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
};

export default EditMovieDialog;
