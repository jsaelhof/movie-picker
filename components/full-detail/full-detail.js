import React, { useCallback, useState } from "react";
import { createPortal } from "react-dom";
import { Button, useMediaQuery } from "@mui/material";
import { PlayArrow } from "@mui/icons-material";
import { useSpring } from "react-spring";
import Search from "@mui/icons-material/Search";
import TelevisionPlay from "@mitch528/mdi-material-ui/TelevisionPlay";
import CloseThick from "@mitch528/mdi-material-ui/CloseThick";

import { formatRuntime } from "../../utils/format-runtime";
import { genreLabels } from "../../constants/genres";
import { searchStreaming, searchTMDB, searchTorrent } from "../../utils/search";
import { sourceLogosLarge, sources } from "../../constants/sources";
import { useGetMovieExtendedDetails } from "../../graphql/queries";
import {
  Actions,
  Backdrop,
  BackdropWrapper,
  CloseButton,
  FullDetailLayout,
  MovieData,
  MovieInfo,
  MovieTitle,
  PlotLayout,
  Poster,
  smallMovieTitle,
  Source,
  streamable,
  StyledStarRating,
  TrailerLayout,
} from "./full-detail.styles";
import { FullDetailSkeleton } from "./full-detail.skeleton";
import MoviePoster from "../movie-poster/movie-poster";
import Rated from "./rated";
import Trailer from "./trailer";
import ScrollArea from "./scroll-area";
import Footer from "./footer";

const FullDetail = ({ movie, showCloseButton = false, onClose }) => {
  const small = useMediaQuery("(max-width: 750px)");
  const noPlotScroll = useMediaQuery("(max-width: 660px), (max-height: 414px)");
  const trailerOverlay = useMediaQuery(
    "(max-width: 500px), (max-height: 414px)"
  );

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

  useGetMovieExtendedDetails(movie, {
    onCompleted: (details) => setData(details),
    onError: () => setData({}),
  });

  const canStream = ![sources.DVD, sources.NONE].includes(movie.source);

  return !data ? (
    <FullDetailSkeleton
      showCloseButton={showCloseButton}
      onClose={onClose}
      small={small}
    />
  ) : (
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

        {trailer && !trailerOverlay && (
          <TrailerLayout>
            <Trailer trailerId={trailer} onComplete={() => setTrailer(null)} />
          </TrailerLayout>
        )}
      </BackdropWrapper>

      {trailer &&
        trailerOverlay &&
        createPortal(
          <Trailer
            overlay
            trailerId={trailer}
            onComplete={() => setTrailer(null)}
          />,
          document.body
        )}

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
            window.open(searchStreaming(movie.title, movie.source), "movieView")
          }
        />

        <PlotLayout>
          <ScrollArea text={data.plot} noScroll={noPlotScroll} />
        </PlotLayout>

        <Actions>
          {data.trailer?.site === "YouTube" && (
            <Button
              color="primary"
              startIcon={<TelevisionPlay />}
              onClick={() => setTrailer(data.trailer.key)}
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

      <Footer movie={movie} />
    </FullDetailLayout>
  );
};

export default FullDetail;
