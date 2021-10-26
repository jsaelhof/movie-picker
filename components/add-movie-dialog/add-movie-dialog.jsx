import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  useMediaQuery,
  styled,
} from "@mui/material";
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
        <Input>
          <StyledMoviePoster
            poster={input.poster}
            height={xsmall ? 130 : undefined}
          />
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
              maxlength: 4,
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
              maxlength: 4,
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

          {input.ratings && <StyledRatings ratings={input.ratings} />}
        </Input>

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

const Input = styled("div")(({ theme: { breakpoints, spacing } }) => ({
  margin: `${spacing(2)} 0 ${spacing(8)}`,
  display: "grid",
  gridTemplateColumns: "180px 100px 100px 150px 175px auto",
  gridTemplateRows: "30px repeat(3, 40px)",
  gridTemplateAreas: `
    "poster . . . . ."
    "poster title title title title title"
    "poster runtime year genre source ratings"
  `,
  columnGap: spacing(2),
  rowGap: spacing(2),
  alignItems: "flex-start",

  "& > *": {
    margin: 0,
  },

  "& li": {
    display: "flex",
    alignItems: "center",
  },

  [breakpoints.down(1140)]: {
    gridTemplateRows: "10px repeat(4, 40px)",
    gridTemplateColumns: "180px 100px 100px 150px 175px auto",
    gridTemplateAreas: `
      "poster . . . . ."
      "poster title title title title title"
      "poster runtime year genre source ."
      "poster ratings ratings ratings ratings ratings"
    `,
  },

  [breakpoints.down(885)]: {
    gridTemplateRows: "repeat(4, 40px)",
    gridTemplateColumns: "180px 100px 75px 75px auto",
    gridTemplateAreas: `
      "poster title title title title"
      "poster runtime genre genre ."
      "poster year source source ."
      "poster ratings ratings ratings ratings"
    `,
  },

  [`${breakpoints.down(600)}, (max-height: 414px)`]: {
    justifyContent: "center",
    gridTemplateColumns: "125px 125px",
    gridTemplateRows: "auto repeat(5, 40px)",
    gridTemplateAreas: `
      "poster poster"
      "title title"
      "runtime year"
      "genre genre"
      "source source"
      "ratings ratings"
    `,
    marginBottom: spacing(4),
  },
}));

const StyledMoviePoster = styled(MoviePoster)`
  grid-area: poster;
`;

const Title = styled(TextField)`
  grid-area: title;
`;

const Runtime = styled(TextField)`
  grid-area: runtime;
`;

const Genre = styled(ListSelect)(() => ({
  gridArea: "genre",

  "& > div": {
    padding: "8.5px 14px",
  },
}));

const Year = styled(TextField)`
  grid-area: year;
`;

const Source = styled(ListSelect)(() => ({
  gridArea: "source",

  "& > div": {
    padding: "5px 14px",
  },
}));

const StyledRatings = styled(Ratings)(
  ({ theme: { breakpoints, spacing } }) => ({
    gridArea: "ratings",
    justifySelf: "flex-end",
    paddingRight: spacing(2),

    [breakpoints.down(1140)]: {
      justifySelf: "flex-start",
    },

    [`${breakpoints.down(600)}, (max-height: 414px)`]: {
      justifySelf: "center",
      paddingRight: 0,
    },
  })
);

export default AddMovieDialog;
