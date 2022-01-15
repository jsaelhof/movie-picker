import React, { useCallback, useRef, useState } from "react";
import { Button, Skeleton, useMediaQuery } from "@mui/material";
import { PlayArrow } from "@mui/icons-material";
import { useQuery } from "@apollo/client";
import { useSpring } from "react-spring";
import Search from "@mui/icons-material/Search";
import TelevisionPlay from "@mitch528/mdi-material-ui/TelevisionPlay";
import CloseThick from "@mitch528/mdi-material-ui/CloseThick";

import { formatRuntime } from "../../utils/format-runtime";
import { genreLabels } from "../../constants/genres";
import { searchStreaming, searchTMDB, searchTorrent } from "../../utils/search";
import { sourceLogosLarge, sources } from "../../constants/sources";
import { GET_MOVIE_EXTENDED_DETAILS } from "../../graphql";
import {
  Actions,
  Backdrop,
  BackdropWrapper,
  CloseButton,
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

const FullDetail = ({ movie, showCloseButton = false, onClose }) => {
  const small = useMediaQuery("(max-width: 750px)");

  const [data, setData] = useState(null);
  const [trailer, setTrailer] = useState(null);
  const [plotScroll, setPlotScroll] = useState([]);

  const plotRef = useRef();

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

  if (!data)
    return (
      <FullDetailLayout>
        {showCloseButton && (
          <CloseButton onClick={onClose}>
            <CloseThick />
          </CloseButton>
        )}

        <BackdropWrapper>
          <Skeleton
            variant="rectangular"
            width="100%"
            height="100%"
            animation="wave"
          />
        </BackdropWrapper>

        <MovieInfo>
          <Poster>
            <Skeleton
              variant="rectangular"
              width={(small ? 300 : 400) * 0.64}
              height={small ? 300 : 400}
              animation="wave"
            />
          </Poster>

          <MovieTitle>
            <Skeleton variant="text" width={300} height={60} animation="wave" />
          </MovieTitle>

          <MovieData>
            <Skeleton variant="text" width={50} height={40} animation="wave" />
            <Skeleton variant="text" width={50} height={40} animation="wave" />
            <Skeleton variant="text" width={50} height={40} animation="wave" />
          </MovieData>

          <Plot>
            <Skeleton
              variant="text"
              width="100%"
              height={30}
              animation="wave"
            />
            <Skeleton
              variant="text"
              width="100%"
              height={30}
              animation="wave"
            />
            <Skeleton
              variant="text"
              width="100%"
              height={30}
              animation="wave"
            />
          </Plot>

          <Actions>
            <Skeleton variant="text" width={100} height={40} animation="wave" />
            <Skeleton variant="text" width={100} height={40} animation="wave" />
          </Actions>
        </MovieInfo>
      </FullDetailLayout>
    );

  return (
    <FullDetailLayout>
      {showCloseButton && (
        <CloseButton onClick={onClose}>
          <CloseThick />
        </CloseButton>
      )}

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
              noLock
            />
          </Poster>

          <MovieTitle
            sx={[(small || movie.title.length >= 25) && smallMovieTitle]}
          >
            <div>{movie.title}</div>
            <StyledStarRating ratings={data.ratings} />
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

          <Plot
            ref={plotRef}
            sx={[
              plotScroll[0] && {
                borderTop: "1px solid red",
              },
              plotScroll[1] && {
                borderBottom: "1px solid red",
              },
            ]}
            onLoad={(e) => console.log(e)}
            onScroll={({
              target: { scrollTop, scrollHeight, clientHeight },
            }) => {
              const canScrollUp = scrollTop > 0;
              const canScrollDown = scrollHeight - clientHeight - scrollTop > 0;
              if (
                canScrollUp !== plotScroll[0] ||
                canScrollDown !== plotScroll[1]
              ) {
                setPlotScroll([canScrollUp, canScrollDown]);
              }
            }}
          >
            <div
              style={{
                width: "100%",
                height: 10,
                background: "black",
                position: "absolute",
                top: 0,
                left: 0,
              }}
            />
            {data.plot}
            <div
              style={{
                width: "100%",
                height: 10,
                background: "black",
                position: "absolute",
                bottom: 0,
                left: 0,
              }}
            />
          </Plot>

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
