import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  useMediaQuery,
} from "@mui/material";
import { isNil } from "lodash";
import React, { useRef, useState } from "react";

import { formatRuntime } from "../../utils/format-runtime";
import { genreLabels, genres } from "../../constants/genres";
import { sourceLabels, sourceLogos, sources } from "../../constants/sources";
import { parseRuntime } from "../../utils/parse-runtime";
import { useGetMovieDetails, useSearchByTitle } from "../../graphql/queries";
import Carousel from "./carousel";
import {
  Genre,
  Input,
  Poster,
  Runtime,
  Source,
  Title,
  Year,
  RatingsContainer,
  Actions,
} from "./add-movie-dialog.styles";
import Ratings from "../ratings/ratings";

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
    locked: false,
    ...initialInputState,
    ...(initialInputState.runtime && {
      runtime: formatRuntime(initialInputState.runtime, true),
    }),
  });

  const xsmall = useMediaQuery("(max-width: 600px), (max-height: 414px)");

  const timeoutId = useRef();

  useSearchByTitle(input.title, {
    skip: !(searchStale && input.title?.length > 0),
    onCompleted: (searchByTitle) => {
      setSearchStale(false);
      setMovies(searchByTitle);
      setSearching(false);
    },
  });

  useGetMovieDetails(movies?.[selectedMovie], {
    onCompleted: (details) =>
      setInput({
        ...input,
        ...details,
      }),
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
      {!xsmall && <DialogTitle>Add a Movie</DialogTitle>}
      <DialogContent>
        <Input>
          <Poster poster={input.poster} height={xsmall ? 130 : undefined} />
          <Title
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

          <Runtime
            label="Runtime"
            value={input.runtime || ""}
            size="small"
            variant="outlined"
            placeholder="0:00"
            inputProps={{
              maxLength: 4,
            }}
            onChange={({ target }) =>
              setInput({ ...input, runtime: target.value })
            }
          />

          <Genre
            onChange={(value) => setInput({ ...input, genre: value })}
            value={input.genre}
            values={genres}
            labels={genreLabels}
          />

          <Year
            label="Year"
            value={input.year || ""}
            size="small"
            variant="outlined"
            placeholder="1978"
            inputProps={{
              maxLength: 4,
            }}
            onChange={({ target }) =>
              setInput({ ...input, year: target.value })
            }
          />

          <Source
            onChange={(value) => setInput({ ...input, source: value })}
            value={input.source}
            values={sources}
            labels={sourceLabels}
            images={sourceLogos}
          />

          {input.ratings && !xsmall && (
            <RatingsContainer>
              <Ratings ratings={input.ratings} dense />
            </RatingsContainer>
          )}
        </Input>

        <Carousel
          movies={movies}
          searching={searching}
          onSelectMovie={(index) => setSelectedMovie(index)}
        />

        <Actions>
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
        </Actions>
      </DialogContent>
    </Dialog>
  );
};

export default AddMovieDialog;
