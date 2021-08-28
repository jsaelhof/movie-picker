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
import Slider from "react-slick";

import { api } from "../../constants/api";
import { genreLabels, genres } from "../../constants/genres";
import { sourceLabels, sourceLogos, sources } from "../../constants/sources";
import { omdbRatingsSource, ratingsSources } from "../../constants/ratings";
import { normalizeRating } from "../../utils/normalize-rating";
import { parseRuntime } from "../../utils/parse-runtime";
import { Ratings } from "./ratings";
import ListSelect from "../list-select/list-select";
import MoviePoster from "./movie-poster";

import styles from "./add-movie-dialog.module.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const AUTO_REFRESH_TIMEOUT = 1500;

const AddMovieDialog = ({ onAddMovie, onCancel }) => {
  const [movies, setMovies] = useState(null);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [searchStale, setSearchStale] = useState(false);
  const [searching, setSearching] = useState(false);

  const [searchInput, setSearchInput] = useState("");
  const [runtimeInput, setRuntimeInput] = useState("");
  const [genre, setGenre] = useState(null);
  const [source, setSource] = useState(null);
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
      setSearching(true);

      const {
        data: { Response, Search },
      } = await axios.get(api.OMDB_SEARCH.replace("%title%", searchInput));

      // Note: Data includes the number of results but Search is limited to 10 per request.
      // If needed, a Load More button could be implemented.
      setMovies(Response === "True" ? Search : []);
      setSearching(false);
    };
    if (searchStale && searchInput.length > 0) {
      search();
    }
  }, [searchStale]);

  const resetSearch = () => {
    setSelectedMovie(null);
    setMovies(null);
    setRuntimeInput(null);
    setRatings(null);
    setPoster(null);
    setGenre(null);
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
            value={searchInput}
            margin="dense"
            fullWidth
            variant="outlined"
            placeholder="Title"
            onChange={({ target }) => {
              clearTimeout(timeoutId.current);
              setSearchInput(target.value);
              if (target.value.length) {
                timeoutId.current = setTimeout(() => {
                  resetSearch();
                  setSearchStale(true);
                }, AUTO_REFRESH_TIMEOUT);
              } else {
                // If the text field is empty, set searchStale to false.
                // If there is any value, set it to true.
                // This prevents a bug that occurs when you backspace all text after completing
                // a search, which is caused when the effect that watches searchStale gets stuck
                // and doesn't fire again when new text is added because searchStale is set to true
                // even though its empty.
                // This case resets the search without setting the searchStale to true.
                resetSearch();
              }
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

          {ratings && <Ratings ratings={ratings} className={styles.ratings} />}
        </div>

        {!movies || movies.length === 0 || searching ? (
          <div className={styles.statusMessage}>
            {searching
              ? "Searching..."
              : movies?.length === 0
              ? "No Movies Found"
              : null}
          </div>
        ) : (
          <Slider
            arrows
            dots
            speed={500}
            slidesToShow={4}
            slidesToScroll={4}
            className={styles.slider}
            responsive={[
              {
                breakpoint: 1200,
                settings: {
                  slidesToShow: 3,
                  slidesToScroll: 3,
                },
              },
              {
                breakpoint: 850,
                settings: {
                  slidesToShow: 2,
                  slidesToScroll: 2,
                },
              },
              {
                breakpoint: 600,
                settings: {
                  slidesToShow: 1,
                  slidesToScroll: 1,
                  dots: false,
                },
              },
            ]}
          >
            {movies.map(({ Poster, Title, Year, imdbID }, index) => (
              <MoviePoster
                key={imdbID}
                poster={Poster}
                title={Title}
                year={Year}
                height={xsmall ? 110 : undefined}
                onClick={() => {
                  setSelectedMovie(index);
                }}
              />
            ))}
          </Slider>
        )}
        <DialogActions>
          <Button onClick={onCancel} variant="outlined">
            Cancel
          </Button>
          <Button
            onClick={() =>
              onAddMovie({
                title: searchInput,
                runtime: parseRuntime(runtimeInput),
                genre,
                source,
              })
            }
            color="primary"
            variant="contained"
            disabled={searchInput.length === 0}
          >
            Add Movie
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
};

export default AddMovieDialog;
