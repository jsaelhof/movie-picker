import React, { useRef, useState } from "react";
import { useSpring } from "react-spring";

import {
  DetailPoster,
  Info,
  InfoData,
  InfoRatings,
  MoreActionsDrawer,
  MovieDetail,
  MovieDetailPositioner,
  MoviePosterContainer,
  MovieContainer,
  OverflowWrapper,
  Source,
  movieDetailPositionerFocused,
  movieContainerFocused,
  moreActionsOpen,
} from "./movie.styles";
import { formatRuntime } from "../../utils/format-runtime";
import { sourceLogos } from "../../constants/sources";
import { useResponsive } from "../../hooks/use-responsive";
import DetailActions from "./detail-actions";
import MoreActions from "./more-actions";
import MoviePoster from "../movie-poster/movie-poster";
import Ratings from "../ratings/ratings";

const Movie = ({ movie, onEditMovie, onMarkWatched, onDeleteMovie }) => {
  const { mobile } = useResponsive();
  const [showMoreActions, setShowMoreActions] = useState(false);
  const [focused, setFocused] = useState(false);
  const timeoutRef = useRef();

  const detailSpring = useSpring({
    from: { transform: "scale(0.67)" },
    to: { transform: `scale(${mobile ? 0.95 : 1})` },
    reverse: !focused,
  });

  const infoSpring = useSpring({
    from: { marginTop: -80 },
    to: { marginTop: 0 },
    reverse: !focused,
  });

  const moreActionsSpring = useSpring({
    to: { transform: `translateY(${showMoreActions ? -100 : 0}%)` },
  });

  return (
    <MovieContainer
      key={movie.id}
      sx={[focused && movieContainerFocused]}
      onMouseEnter={() => {
        timeoutRef.current = setTimeout(() => {
          setFocused(true);
        }, 250);
      }}
      onMouseLeave={() => {
        clearTimeout(timeoutRef.current);
        setShowMoreActions(false);
        setFocused(false);
      }}
    >
      <MoviePosterContainer>
        <MoviePoster movie={movie} />
      </MoviePosterContainer>

      <MovieDetailPositioner sx={[focused && movieDetailPositionerFocused]}>
        <MovieDetail style={detailSpring}>
          <OverflowWrapper>
            <DetailPoster movie={movie} height={375} />

            <Source>
              {<img src={sourceLogos[movie.source]} width="40" height="40" />}
            </Source>

            <Info style={infoSpring}>
              <InfoData>
                <div>{formatRuntime(movie.runtime)}</div>
                <div>{movie.year}</div>
              </InfoData>

              <InfoRatings>
                <Ratings size="small" ratings={movie.ratings} dense />
              </InfoRatings>

              <DetailActions
                movie={movie}
                onEdit={() => {
                  setFocused(false);
                  onEditMovie(movie);
                }}
                onMarkWatched={() => {
                  setFocused(false);
                  onMarkWatched(movie);
                }}
                onToggleLock={(locked) => {
                  onEditMovie({ ...movie, locked }, false);
                }}
                onMoreActions={() => {
                  setShowMoreActions(true);
                }}
              />
            </Info>

            {
              <MoreActionsDrawer
                sx={[showMoreActions && moreActionsOpen]}
                style={moreActionsSpring}
              >
                <MoreActions
                  movie={movie}
                  onClose={() => setShowMoreActions(false)}
                  onDeleteMovie={() => onDeleteMovie(movie)}
                />
              </MoreActionsDrawer>
            }
          </OverflowWrapper>
        </MovieDetail>
      </MovieDetailPositioner>
    </MovieContainer>
  );
};

export default Movie;
