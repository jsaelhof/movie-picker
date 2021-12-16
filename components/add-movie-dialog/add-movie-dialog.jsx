import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  useMediaQuery,
} from "@mui/material";
import clsx from "clsx";
import { isNil } from "lodash";
import React, { useRef, useState } from "react";
import { useQuery } from "@apollo/client";

import { formatRuntime } from "../../utils/format-runtime";
import { genreLabels, genres } from "../../constants/genres";
import { sourceLabels, sourceLogos, sources } from "../../constants/sources";
import { parseRuntime } from "../../utils/parse-runtime";
import { GET_MOVIE_DETAILS, SEARCH_BY_TITLE } from "../../graphql";
import Carousel from "./carousel";
import ListSelect from "./list-select";
import MoviePoster from "./movie-poster";
import Ratings from "../ratings/ratings";

import styles from "./add-movie-dialog.module.css";

const AUTO_REFRESH_TIMEOUT = 1500;

const AddMovieDialog = ({
  onAddMovie,
  onCancel,
  movie: initialInputState = {},
}) => {
  const [movies, setMovies] = useState(null);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [searchStale, setSearchStale] = useState(!!initialInputState.title);
  const [searching, setSearching] = useState(false);

  // TODO: This tracks more than just the inputs now (poster, ratings etc) so maybe rename it.
  const [input, setInput] = useState({
    title: "",
    runtime: "",
    genre: null,
    source: sources.NONE,
    year: "",
    ...initialInputState,
    ...(initialInputState.runtime && {
      runtime: formatRuntime(initialInputState.runtime, true),
    }),
  });

  const medium = useMediaQuery("(max-width: 1140px)");
  const small = useMediaQuery("(max-width: 885px)");
  const xsmall = useMediaQuery("(max-width: 600px), (max-height: 414px)");

  const timeoutId = useRef();

  useQuery(SEARCH_BY_TITLE, {
    skip: !(searchStale && input.title?.length > 0),
    variables: { title: input.title },
    onCompleted: ({ searchByTitle }) => {
      setSearchStale(false);
      setMovies(searchByTitle);
      setSearching(false);
    },
  });

  useQuery(GET_MOVIE_DETAILS, {
    skip: !movies?.[selectedMovie],
    variables: { imdbID: movies?.[selectedMovie]?.imdbID },
    onCompleted: ({ omdbMovie, tmdbProvider }) => {
      setInput({
        ...input,
        ...omdbMovie,
        ...(tmdbProvider && { source: tmdbProvider.provider }),
      });
    },
  });

  const resetSearch = () => {
    setSelectedMovie(null);
    setMovies(null);
    setInput((state) => ({
      ...state,
      poster: null,
      ratings: null,
    }));
  };

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
            poster={input.poster}
            height={xsmall ? 130 : undefined}
            className={styles.poster}
          />
          <TextField
            className={styles.title}
            label="Title"
            value={input.title}
            size="small"
            fullWidth
            variant="outlined"
            placeholder="Title"
            onChange={({ target }) => {
              clearTimeout(timeoutId.current);
              setInput({ ...input, title: target.value });
              resetSearch();
              if (target.value.length) {
                timeoutId.current = setTimeout(() => {
                  setSearchStale(true);
                  setSearching(true);
                }, AUTO_REFRESH_TIMEOUT);
              }
            }}
            autoFocus
          />

          <TextField
            className={styles.runtime}
            label="Runtime"
            value={input.runtime || ""}
            size="small"
            variant="outlined"
            placeholder="0:00"
            inputProps={{
              maxlength: 4,
            }}
            onChange={({ target }) =>
              setInput({ ...input, runtime: target.value })
            }
          />

          <ListSelect
            className={styles.genre}
            onChange={(value) => setInput({ ...input, genre: value })}
            value={input.genre}
            values={genres}
            labels={genreLabels}
          />

          <TextField
            className={styles.year}
            label="Year"
            value={input.year || ""}
            size="small"
            variant="outlined"
            placeholder="1978"
            inputProps={{
              maxlength: 4,
            }}
            onChange={({ target }) =>
              setInput({ ...input, year: target.value })
            }
          />

          <ListSelect
            className={styles.source}
            onChange={(value) => setInput({ ...input, source: value })}
            value={input.source}
            values={sources}
            labels={sourceLabels}
            images={sourceLogos}
          />

          {input.ratings && (
            <Ratings ratings={input.ratings} className={styles.ratings} />
          )}
        </div>

        <Carousel
          movies={movies}
          searching={searching}
          onSelectMovie={(index) => setSelectedMovie(index)}
        />

        <DialogActions>
          <Button onClick={onCancel} variant="outlined">
            Cancel
          </Button>
          <Button
            onClick={() => {
              onAddMovie({
                ...input,
                runtime: parseRuntime(input.runtime),
                // If we have additional data not captured in inputs loaded, add it to the movie
                ...(!isNil(selectedMovie) && {
                  imdbID: movies[selectedMovie].imdbID,
                  poster: movies[selectedMovie].poster,
                }),
              });
            }}
            color="primary"
            variant="contained"
            disabled={input.title?.length === 0}
          >
            Save Movie
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
};

export default AddMovieDialog;
