import React, { useRef, useState } from "react";
import { animated, useSpring } from "react-spring";
import { debounce, isEqual } from "lodash";
import { useQuery } from "@apollo/client";

import {
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
  DetailPosterLayout,
  SourceImage,
  SourceBorder,
  InfoRuntime,
  InfoBottomRow,
  StarRatingLayout,
} from "./movie.styles";
import { formatRuntime } from "../../utils/format-runtime";
import { sourceLogos } from "../../constants/sources";
import { useResponsive } from "../../hooks/use-responsive";
import DetailActions from "./detail-actions";
import MoreActions from "./more-actions";
import MoviePoster from "../movie-poster/movie-poster";
import Ratings from "../ratings/ratings";
import { GET_RATINGS } from "../../graphql";
import FiveStarRating from "../ratings/five-star-rating";

const Movie = ({ movie, onEditMovie, onMarkWatched, onDeleteMovie }) => {
  const { mobile } = useResponsive();
  const [showMoreActions, setShowMoreActions] = useState(false);
  const [infoState, setInfoState] = useState("actions");
  // const [focused, setFocused] = useState(false);
  const [focused, setFocused] = useState(movie.id === "266639538");

  const switchToRatings = debounce(() => setInfoState("ratings"), 250);
  const focus = debounce(() => setFocused(true), 250);

  const posterSpring = useSpring({
    from: { transform: "scale3d(0.67,0.67,1)" },
    to: { transform: "scale3d(1,1,1)" },
    reverse: !focused,
  });

  const actionsSpring = useSpring({
    transform:
      infoState === "actions" ? "translateX(0px)" : "translateX(240px)",
  });

  const ratingsSpring = useSpring({
    transform:
      infoState === "ratings" ? "translateX(0px)" : "translateX(-240px)",
  });

  // const detailSpring = useSpring({
  //   from: { transform: "scale(0.67)" },
  //   to: { transform: `scale(${mobile ? 0.95 : 1})` },
  //   reverse: !focused,
  // });

  // const infoSpring = useSpring({
  //   from: { marginTop: -80 },
  //   to: { marginTop: 0 },
  //   reverse: !focused,
  // });

  // const moreActionsSpring = useSpring({
  //   to: { transform: `translateY(${showMoreActions ? -100 : 0}%)` },
  // });

  useQuery(GET_RATINGS, {
    skip: !focused,
    variables: { imdbID: movie.imdbID },
    onCompleted: ({ omdbMovie: { ratings } }) => {
      if (!isEqual(ratings, movie.ratings)) {
        onEditMovie({ ...movie, ratings }, false);
      }
    },
  });

  return (
    <MovieContainer
      key={movie.id}
      sx={[focused && movieContainerFocused]}
      // onMouseEnter={focus}
      // onMouseLeave={() => {
      //   focus.cancel();
      //   setShowMoreActions(false);
      //   setFocused(false);
      // }}
    >
      <MoviePosterContainer>
        <MoviePoster movie={movie} />
      </MoviePosterContainer>

      <MovieDetailPositioner sx={[focused && movieDetailPositionerFocused]}>
        <MovieDetail style={posterSpring}>
          <OverflowWrapper>
            <MoviePoster movie={movie} height={375} />

            <Info>
              <InfoData>
                <StarRatingLayout
                  onMouseEnter={switchToRatings}
                  onMouseLeave={() => {
                    switchToRatings.cancel();
                    setInfoState("actions");
                  }}
                >
                  <FiveStarRating ratings={movie.ratings} anchor="center" />
                </StarRatingLayout>
                <InfoRuntime>{formatRuntime(movie.runtime)}</InfoRuntime>
              </InfoData>

              <InfoBottomRow style={actionsSpring}>
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
                />
              </InfoBottomRow>

              <InfoBottomRow style={ratingsSpring}>
                <Ratings ratings={movie.ratings} size="small" dense />
              </InfoBottomRow>
            </Info>

            <Source>
              <SourceBorder />
              <SourceImage
                sx={{
                  backgroundImage: `url("${sourceLogos[movie.source]}")`,
                }}
              />
            </Source>
          </OverflowWrapper>
        </MovieDetail>
      </MovieDetailPositioner>

      {/* <MovieDetailPositioner sx={[focused && movieDetailPositionerFocused]}>
        <MovieDetail style={detailSpring}>
          <OverflowWrapper>
            <DetailPosterLayout>
              <MoviePoster movie={movie} height={375} />
            </DetailPosterLayout>

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
      </MovieDetailPositioner> */}
    </MovieContainer>
  );
};

export default Movie;
