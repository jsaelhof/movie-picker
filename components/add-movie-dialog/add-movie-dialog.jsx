import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  useMediaQuery,
} from "@material-ui/core";
import axios from "axios";
import clsx from "clsx";
import findKey from "lodash/findKey";
import isNil from "lodash/isNil";
import React, { useEffect, useRef, useState } from "react";

import { api } from "../../constants/api";
import { formatRuntime } from "../../utils/format-runtime";
import { genreLabels, genres } from "../../constants/genres";
import { sourceLabels, sourceLogos, sources } from "../../constants/sources";
import {
  omdbRatingsSource,
  ratingsSource,
  ratingsSourceReverseLookup,
  ratingsSources,
} from "../../constants/ratings";
import { normalizeRating } from "../../utils/normalize-rating";
import { parseRuntime } from "../../utils/parse-runtime";
import { Ratings } from "./ratings";
import Carousel from "./carousel";
import ListSelect from "../list-select/list-select";
import MoviePoster from "./movie-poster";

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

  const [input, setInput] = useState({
    title: "",
    runtime: "",
    genre: null,
    source: null,
    ...initialInputState,
    ...(initialInputState.runtime && {
      runtime: formatRuntime(initialInputState.runtime, true),
    }),
  });

  const [poster, setPoster] = useState(null);
  const [ratings, setRatings] = useState(null);

  const medium = useMediaQuery("(max-width: 1100px)");
  const small = useMediaQuery("(max-width: 795px)");
  const xsmall = useMediaQuery("(max-width: 600px), (max-height: 414px)");

  const timeoutId = useRef();

  useEffect(() => {
    const title = async () => {
      const {
        data: { Title, Response, Runtime, Genre, Poster, Ratings },
      } = await axios.get(
        movies[selectedMovie].imdbID
          ? api.OMDB_IMDBID.replace("%imdbid%", movies[selectedMovie].imdbID)
          : api.OMDB_TITLE.replace("%title%", movies[selectedMovie].Title)
      );

      if (Response === "True") {
        // Runtime includes " min" like "113 min".
        // ParseInt strips out the text portion.
        const runtime =
          Runtime && Runtime !== "N/A" ? parseInt(Runtime).toString() : null;

        // Genre is a delimited string of genres.
        // Search my list and see if a match is found.
        // If so we'll set that as the genre, otherwise ignore.
        const genre = findKey(genreLabels, (genre) =>
          Genre.split(", ").includes(genre)
        );

        const ratings = Ratings
          ? Ratings.filter(({ Source }) =>
              ratingsSources.includes(omdbRatingsSource[Source])
            ).map(({ Source, Value }) => ({
              source: omdbRatingsSource[Source],
              rating: normalizeRating(omdbRatingsSource[Source], Value),
            }))
          : [];

        setInput({
          ...input,
          title: Title,
          runtime,
          ...(genre && { genre: parseInt(genre) }),
        });
        setRatings(ratings);
        setPoster(Poster && Poster !== "N/A" ? Poster : null);
      }
    };

    if (!isNil(selectedMovie)) {
      title();
    }
  }, [selectedMovie]);

  useEffect(() => {
    const search = async () => {
      setSearchStale(false);
      setSearching(true);

      const {
        data: { Response, Search },
      } = await axios.get(api.OMDB_SEARCH.replace("%title%", input.title));

      // Note: Data includes the number of results but Search is limited to 10 per request.
      // If needed, a Load More button could be implemented.
      setMovies(Response === "True" ? Search : []);
      setSearching(false);
    };

    if (searchStale && input.title?.length > 0) {
      search();
    }
  }, [searchStale]);

  const resetSearch = () => {
    setSelectedMovie(null);
    setMovies(null);
    setRatings(null);
    setPoster(null);
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
            poster={poster}
            height={xsmall ? 130 : undefined}
            className={styles.poster}
          />
          <TextField
            className={styles.title}
            label="Title"
            value={input.title}
            margin="dense"
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
                }, AUTO_REFRESH_TIMEOUT);
              }
            }}
            autoFocus
          />

          <TextField
            className={styles.runtime}
            label="Runtime"
            value={input.runtime}
            margin="dense"
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

          <ListSelect
            className={styles.source}
            onChange={(value) => setInput({ ...input, source: value })}
            value={input.source}
            values={sources}
            labels={sourceLabels}
            images={sourceLogos}
          />

          {ratings && <Ratings ratings={ratings} className={styles.ratings} />}
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
                title: input.title,
                runtime: parseRuntime(input.runtime),
                genre: input.genre,
                source: input.source,
                // If we have additional data not captured in inputs loaded, add it to the movie
                ...(!isNil(selectedMovie) && {
                  imdbID: movies[selectedMovie].imdbID,
                  poster: movies[selectedMovie].Poster,
                  year: movies[selectedMovie].Year,
                }),
                // Add the ratings
                ratings: ratings.reduce((acc, { source, rating }) => {
                  acc[ratingsSourceReverseLookup[source]] = rating;
                  return acc;
                }, {}),
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
