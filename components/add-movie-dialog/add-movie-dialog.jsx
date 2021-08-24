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
import React, { useEffect, useRef, useState } from "react";

import { api } from "../../constants/api";
import { genreLabels, genres } from "../../constants/genres";
import { sourceLabels, sourceLogos, sources } from "../../constants/sources";
import {
  omdbRatingsSource,
  ratingsSourceImage,
  ratingsSources,
} from "../../constants/ratings";
import { normalizeRating } from "../../utils/normalize-rating";
import ListSelect from "../list-select/list-select";
import MoviePoster from "./movie-poster";

import styles from "./add-movie-dialog.module.css";

const AUTO_REFRESH_TIMEOUT = 1500;

const AddMovieDialog = ({ onUseInfo, onCancel }) => {
  const [movies, setMovies] = useState();
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [searchStale, setSearchStale] = useState(false);

  const [searchInput, setSearchInput] = useState(null);
  const [runtimeInput, setRuntimeInput] = useState("");
  const [genre, setGenre] = useState(null);
  const [source, setSource] = useState(null);
  const [poster, setPoster] = useState(null);
  const [ratings, setRatings] = useState(null);

  console.log({
    runtimeInput,
  });

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

        setSearchInput(Title);
        setRuntimeInput(runtime);
        setGenre(genre && parseInt(genre));
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

      const {
        data: { Response, Search },
      } = await axios.get(api.OMDB_SEARCH.replace("%title%", searchInput));

      // Note: Data includes the number of results but Search is limited to 10 per request.
      // If needed, a Load More button could be implemented.
      setMovies(Response === "True" ? Search : []);
    };
    if (searchStale && searchInput.length > 0) {
      search();
    }
  }, [searchStale]);

  return (
    <Dialog open={true} fullWidth maxWidth="lg">
      <DialogContent>
        <div className={styles.inputGrid}>
          {movies?.[selectedMovie] ? (
            <MoviePoster poster={poster} />
          ) : (
            "PLACEHOLDER"
          )}
          <div className={styles.input}>
            <TextField
              className={styles.title}
              id="searchInput"
              label="Title"
              value={searchInput}
              margin="dense"
              fullWidth
              variant="outlined"
              placeholder="Title"
              onChange={({ target }) => {
                setSearchInput(target.value);
                clearTimeout(timeoutId.current);
                timeoutId.current = setTimeout(() => {
                  setSelectedMovie(null);
                  setMovies(null);
                  setRuntimeInput(null);
                  setRatings(null);
                  setPoster(null);
                  setGenre(null);
                  setSearchStale(true);
                }, AUTO_REFRESH_TIMEOUT);
              }}
              autoFocus
            />

            <TextField
              id="runtimeInput"
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
              id="genre"
              onChange={(value) => setGenre(value)}
              value={genre}
              values={genres}
              labels={genreLabels}
            />

            <ListSelect
              className={styles.source}
              id="source"
              onChange={(value) => setSource(value)}
              value={source}
              values={sources}
              labels={sourceLabels}
              images={sourceLogos}
            />

            {ratings && (
              <ul>
                {ratings.map(({ source, rating }) => (
                  <li>
                    <img
                      src={`/images/ratings/${ratingsSourceImage[source]}`}
                      className={styles.ratingsSourceIcon}
                    />
                    {rating}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {!movies || movies.length === 0 ? (
          <div className={styles.placeholder}>
            {!movies ? "Searching..." : "No Movies Found"}
          </div>
        ) : (
          <div className={styles.posterGrid}>
            {movies.map(({ Poster, Title, Year, imdbID }, index) => (
              <MoviePoster
                key={imdbID}
                poster={Poster}
                title={Title}
                year={Year}
                selected={
                  !isNil(selectedMovie) ? index === selectedMovie : null
                }
                onClick={() => {
                  setSelectedMovie(index);
                }}
              />
            ))}
          </div>
        )}
        <DialogActions>
          <Button onClick={onCancel} variant="outlined">
            Cancel
          </Button>
          <Button
            // onClick={() => onUseInfo(result)}
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

export default AddMovieDialog;
