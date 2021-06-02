import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  TextField,
} from "@material-ui/core";
import axios from "axios";
import findKey from "lodash/findKey";
import isNil from "lodash/isNil";
import React, {useEffect, useRef, useState} from "react";

import {api} from "../../constants/api";
import {genreLabels} from "../../constants/genres";
import MoviePoster from "./movie-poster";

import styles from "./search-movie-dialog.module.css";

const AUTO_REFRESH_TIMEOUT = 1500;

const SearchMovieDialog = ({search: initialSearch, onUseInfo, onCancel}) => {
  const [result, setResult] = useState();
  const [movies, setMovies] = useState();
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [searchInput, setSearchInput] = useState(initialSearch);
  const [searchStale, setSearchStale] = useState(true);

  const timeoutId = useRef();

  useEffect(() => {
    const title = async () => {
      const {
        data: {Title, Response, Runtime, Genre, Poster},
      } = await axios.get(
        api.OMDB_TITLE.replace("%title%", movies[selectedMovie].Title),
      );

      if (Response === "True") {
        // Runtime includes " min" like "113 min".
        // ParseInt strips out the text portion.
        const runtime = parseInt(Runtime).toString();

        // Genre is a delimited string of genres.
        // Search my list and see if a match is found.
        // If so we'll set that as the genre, otherwise ignore.
        const genre = findKey(genreLabels, (genre) =>
          Genre.split(", ").includes(genre),
        );

        setResult({
          title: Title,
          poster: Poster && Poster !== "N/A" ? Poster : null,
          runtime,
          genre,
        });
      }
    };

    if (!isNil(selectedMovie)) {
      title();
    }
  }, [selectedMovie]);

  useEffect(() => {
    const search = async () => {
      setSearchStale(false);

      const {
        data: {Response, Search},
      } = await axios.get(api.OMDB_SEARCH.replace("%title%", searchInput));

      // Note: Data includes the number of results but Search is limited to 10 per request.
      // If needed, a Load More button could be implemented.
      setMovies(Response === "True" ? Search : []);
    };
    if (searchStale) {
      search();
    }
  }, [searchStale]);

  return (
    <Dialog open={true} fullWidth maxWidth="lg">
      <DialogContent>
        <div className={styles.input}>
          <TextField
            id="searchInput"
            label="Search"
            value={searchInput}
            margin="dense"
            fullWidth
            variant="outlined"
            placeholder="Title"
            onChange={({target}) => {
              setSearchInput(target.value);
              clearTimeout(timeoutId.current);
              timeoutId.current = setTimeout(() => {
                setSelectedMovie(null);
                setResult(null);
                setMovies(null);
                setSearchStale(true);
              }, AUTO_REFRESH_TIMEOUT);
            }}
            autoFocus
          />
        </div>

        {!movies || movies.length === 0 ? (
          <div className={styles.placeholder}>
            {!movies ? "Searching..." : "No Movies Found"}
          </div>
        ) : (
          <div className={styles.posterGrid}>
            {movies.map(({Poster, Title, Year, imdbID}, index) => (
              <MoviePoster
                key={imdbID}
                poster={Poster}
                title={Title}
                year={Year}
                selected={
                  !isNil(selectedMovie) ? index === selectedMovie : null
                }
                onClick={() => setSelectedMovie(index)}
              />
            ))}
          </div>
        )}
        <DialogActions>
          <Button onClick={onCancel} variant="outlined">
            Cancel
          </Button>
          <Button
            onClick={() => onUseInfo(result)}
            color="primary"
            variant="contained"
            disabled={isNil(selectedMovie)}
          >
            Use Info
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
};

export default SearchMovieDialog;
