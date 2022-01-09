import React, { useCallback, useState } from "react";
import { Button, useMediaQuery } from "@mui/material";
import { PlayArrow } from "@mui/icons-material";
import { useQuery } from "@apollo/client";
import { useSpring } from "react-spring";
import Search from "@mui/icons-material/Search";
import TelevisionPlay from "@mitch528/mdi-material-ui/TelevisionPlay";

import { formatRuntime } from "../../utils/format-runtime";
import { genreLabels } from "../../constants/genres";
import { searchStreaming, searchTMDB, searchTorrent } from "../../utils/search";
import { sourceLogosLarge, sources } from "../../constants/sources";
import { GET_MOVIE_EXTENDED_DETAILS } from "../../graphql";
import {
  Actions,
  Backdrop,
  BackdropWrapper,
  FullDetailLayout,
  MovieData,
  MovieInfo,
  MovieTitle,
  Plot,
  Poster,
  smallMovieTitle,
  Source,
  streamable,
  StyledStarRating,
  TrailerLayout,
} from "./full-detail.styles";
import MoviePoster from "../movie-poster/movie-poster";
import Rated from "./rated";
import Trailer from "./trailer";

const FullDetail = ({ movie }) => {
  const small = useMediaQuery("(max-width: 750px)");
  const xsmall = useMediaQuery("(max-width: 660px)");

  const [data, setData] = useState(null);
  const [trailer, setTrailer] = useState(null);

  const fadeSpring = useSpring({
    opacity: data ? 1 : 0,
  });

  const growSpring = useSpring({
    from: {
      transform: "translateX(-100px)",
    },
    transform: data ? "translateX(0)" : "translateX(-100px)",
    reset: data === null,
  });

  const search = useCallback(() => {
    window.open(searchTMDB(movie.title), "moviedb");
  }, [movie]);

  useQuery(GET_MOVIE_EXTENDED_DETAILS, {
    errorPolicy: "all",
    variables: {
      imdbID: movie.imdbID,
    },
    onCompleted: ({ tmdbMovie, omdbMovie }) =>
      setData({ ...omdbMovie, ...tmdbMovie }),
    onError: () => setData({}),
  });

  const canStream = ![sources.DVD, sources.NONE].includes(movie.source);

  return (
    <FullDetailLayout>
      <BackdropWrapper>
        <Backdrop
          sx={[
            data?.backdrop && {
              backgroundImage: `url("${data.backdrop}")`,
            },
          ]}
          style={{
            ...fadeSpring,
          }}
        />

        {trailer && (
          <TrailerLayout>
            <Trailer trailerId={trailer} onComplete={setTrailer} />
          </TrailerLayout>
        )}
      </BackdropWrapper>

      {data && (
        <MovieInfo>
          <Poster style={growSpring}>
            <MoviePoster
              height={small ? 300 : 400}
              movie={movie}
              onClick={search}
            />
          </Poster>

          <MovieTitle
            sx={[(small || movie.title.length >= 25) && smallMovieTitle]}
          >
            <div>{movie.title}</div>
            <StyledStarRating
              ratings={data.ratings}
              anchor={xsmall ? "center" : "left"}
            />
          </MovieTitle>

          <MovieData>
            <div>{formatRuntime(movie.runtime)}</div>
            <div>{movie.year}</div>
            <div>{genreLabels[movie.genre]}</div>
            <Rated rated={data.certification} />
          </MovieData>

          <Source
            sx={[canStream && streamable]}
            src={sourceLogosLarge[movie.source]}
            onClick={() =>
              canStream &&
              window.open(
                searchStreaming(movie.title, movie.source),
                "movieView"
              )
            }
          />

          <Plot>{data.plot}</Plot>

          <Actions>
            {data?.trailer?.site === "YouTube" && (
              <Button
                color="primary"
                startIcon={<TelevisionPlay />}
                onClick={() => {
                  setTrailer(data.trailer.key);
                }}
              >
                Watch Trailer
              </Button>
            )}

            {canStream && (
              <Button
                color="primary"
                startIcon={<PlayArrow />}
                onClick={() => {
                  window.open(
                    searchStreaming(movie.title, movie.source),
                    "movieView"
                  );
                }}
              >
                Stream Movie
              </Button>
            )}

            {movie.source === sources.NONE && (
              <Button
                color="primary"
                startIcon={<Search />}
                onClick={() => {
                  window.open(searchTorrent(movie.title), "movieView");
                }}
              >
                Torrent Search
              </Button>
            )}
          </Actions>
        </MovieInfo>
      )}
    </FullDetailLayout>
  );
};

export default FullDetail;