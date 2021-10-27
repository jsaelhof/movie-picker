import React, { useCallback, useState } from "react";
import { Button, useMediaQuery, styled } from "@mui/material";

import { formatRuntime } from "../../utils/format-runtime";
import { genreLabels } from "../../constants/genres";
import { searchStreaming, searchTMDB, searchTorrent } from "../../utils/search";
import Rated from "./rated";
import MoviePoster from "../movie-poster/movie-poster";
import { animated, useSpring } from "react-spring";
import { sourceLogosLarge, sources } from "../../constants/sources";
import TelevisionPlay from "@mitch528/mdi-material-ui/TelevisionPlay";
import StarRating from "../ratings/star-rating";
import { PlayArrow } from "@mui/icons-material";
import Search from "@mui/icons-material/Search";
import { useQuery } from "@apollo/client";
import { GET_MOVIE_EXTENDED_DETAILS } from "../../graphql";
import { toTransientProps } from "../../utils/to-transient-props";

const buildTrailerUrl = ({ site, key }) => {
  switch (site) {
    case "YouTube":
      return `https://www.youtube.com/embed/${key}?autoplay=1`;
    case "Vimeo":
      return `https://player.vimeo.com/video/${key}`;
    default:
      console.warn(`No pattern exists for site "${site}"`);
      return null;
  }
};

const Pick = ({ movie }) => {
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
    <PickGrid>
      <BackdropWrapper>
        <Backdrop
          {...(data && { $backdrop: data.backdrop })}
          style={{
            ...fadeSpring,
          }}
        />
      </BackdropWrapper>

      {trailer && (
        <PlayerWrapper onClick={() => setTrailer(null)}>
          <Player
            src={trailer}
            frameborder="0"
            allow="autoplay; clipboard-write; encrypted-media;"
            allowfullscreen
          ></Player>
        </PlayerWrapper>
      )}

      {data && (
        <MovieInfo>
          <Poster style={growSpring}>
            <MoviePoster
              height={small ? 300 : 400}
              movie={movie}
              onClick={search}
            />
          </Poster>

          <MovieTitle {...toTransientProps(movie)}>
            <div>{movie.title}</div>
            <StyledStarRating
              ratings={movie.ratings}
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
            $canStream={canStream}
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
            {data.trailer && (
              <Button
                color="primary"
                startIcon={<TelevisionPlay />}
                onClick={() => {
                  setTrailer(buildTrailerUrl(data.trailer));
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
    </PickGrid>
  );
};

const PickGrid = styled("div")`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const BackdropWrapper = styled("div")`
  mask-image: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 1) 50%,
    transparent 100%
  );
  height: 60vh;
  width: 100%;

  @media (max-width: 750px) {
    height: 50vh;
  }

  @media (max-width: 1200px) {
    height: 60vh;
  }

  @media (max-width: 2000px) {
    height: 65vh;
  }
`;

const Backdrop = styled(animated.div)`
  background-size: cover;
  background-position-x: center;
  height: 100%;
  width: 100%;

  background-image: ${({ $backdrop }) =>
    $backdrop ? `url("${$backdrop}")` : "linear-gradient(to top, white, #ccc)"};
`;

const PlayerWrapper = styled("div")`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: radial-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.9));
  z-index: 1000000;
`;

const Player = styled("iframe")`
  box-shadow: 4px 10px 10px rgb(0 0 0 / 30%);
  border: 2px solid #333;
  width: 90vw;
  height: calc(90vw * (1 / 1.778));
  background-color: black;
`;

const MovieInfo = styled("div")`
  margin: -160px 32px 32px 32px;
  display: grid;
  grid-template-areas:
    "poster title title"
    "poster info source"
    "poster plot plot"
    "poster actions actions";
  grid-template-rows: 130px 40px auto 45px;
  grid-template-columns: max-content 1fr max-content;
  max-width: 960px;
  min-height: 400px;
  z-index: 10;

  @media (max-width: 660px) {
    margin-top: -150px;
    grid-template-areas:
      "poster poster"
      "title title"
      "info source"
      "plot plot"
      "actions actions";
    grid-template-rows: 300px auto 40px max-content auto 45px;
    grid-template-columns: 1fr;
    min-height: 300px;
  }

  @media (max-width: 750px) {
    margin-top: -150px;
  }

  @media (max-width: 1200px) {
    margin-top: -180px;
  }

  @media (max-width: 2000px) {
    margin-top: -200px;
  }
`;

const Poster = styled(animated.div)`
  grid-area: poster;
  margin-right: 32px;
  height: fit-content;
  box-shadow: 3px 10px 10px rgba(0, 0, 0, 0.1),
    0px 5px 15px 0px rgba(0, 0, 0, 0.1), 0px 1px 20px 0px rgba(0, 0, 0, 0.12);

  @media (max-width: 660px) {
    margin-right: 0;
    justify-self: center;
  }
`;

const MovieTitle = styled("div")`
  grid-area: title;
  font-size: 48px;
  font-weight: bold;
  color: ${({ theme }) => theme.palette.grey[900]};
  display: flex;
  justify-content: flex-end;
  flex-direction: column;
  text-shadow: 0 0 3px white;
  margin-bottom: 8px;

  @media (max-width: 750px), ${({ $title }) => $title.length >= 25} {
    font-size: 32px;
  }

  @media (max-width: 660px) {
    font-size: 32px;
    align-items: center;
    text-align: center;

    ${({ theme: { spacing } }) => ({
      paddingTop: spacing(3),
      marginBottom: spacing(2),
    })}
  }
`;

const StyledStarRating = styled(StarRating)`
  margin: ${({ theme }) => theme.spacing(1)} 0;
  grid-area: ratings;
`;

const MovieData = styled("div")`
  padding: 0;
  display: grid;
  column-gap: ${({ theme }) => theme.spacing(3)};
  grid-auto-flow: column;
  grid-template-columns: repeat(3, max-content) 1fr;
  font-size: 14px;
  align-items: center;
  grid-area: info;
  color: ${({ theme }) => theme.palette.grey[900]};

  @media (max-width: 750px) {
    column-gap: 20px;
  }

  @media (max-width: 660px) {
    column-gap: ${({ theme }) => theme.spacing(2)};
  }
`;

const Source = styled("img")`
  grid-area: source;
  height: 40px;
  margin-left: auto;
  cursor: ${({ $canStream }) => $canStream && "pointer"};
  ${({ $canStream }) =>
    $canStream && {
      cursor: "pointer",
      "&:hover": { transform: "scale(1.1)" },
    }};
`;

const Plot = styled("div")`
  grid-area: plot;
  line-height: 1.7;
  ${({ theme: { palette, spacing } }) => ({
    color: palette.grey[900],
    paddingTop: spacing(2),
    paddingBottom: spacing(3),
  })}
`;

const Actions = styled("div")`
  grid-area: actions;
  display: grid;
  grid-auto-flow: column;
  column-gap: ${({ theme }) => theme.spacing(4)};
  justify-content: flex-start;

  @media (max-width: 660px) {
    justify-content: center;
  }

  @media (max-width: 450px) {
    button {
      display: grid;
    }

    span {
      justify-items: center;
    }
  }
`;

export default Pick;
