import React, { useRef, useState } from "react";
import { useSpring } from "react-spring";
import { debounce, isEqual } from "lodash";
import { useQuery } from "@apollo/client";

import {
  InfoLayout,
  InfoFooterLayout,
  InfoRuntime,
  MovieDetail,
  MovieDetailPositioner,
  MoviePosterContainer,
  MovieContainer,
  OverflowWrapper,
  movieDetailPositionerFocused,
  movieContainerFocused,
  StarRatingLayout,
  SourceLayout,
} from "./movie.styles";
import { formatRuntime } from "../../utils/format-runtime";
import DetailActions from "./detail-actions";
import MoviePoster from "../movie-poster/movie-poster";
import Ratings from "../ratings/ratings";
import { GET_RATINGS } from "../../graphql";
import FiveStarRating from "../ratings/five-star-rating";
import Source from "./source";
import Expanded from "./expanded";

const getCenterPoint = (rect) => {
  if (!rect) return undefined;

  const { x, y, width, height } = rect;
  return { x: x + width / 2, y: y + height / 2 };
};

const Movie = ({ movie, onEditMovie, onMarkWatched, onDeleteMovie }) => {
  const ref = useRef();
  const centerPoint = getCenterPoint(ref.current?.getBoundingClientRect());

  const [infoState, setInfoState] = useState("actions");
  const [focused, setFocused] = useState(false);
  const [expanded, setExpanded] = useState(false);
  // const [focused, setFocused] = useState(movie.id === "266639538");

  const switchToRatings = debounce(() => setInfoState("ratings"), 250);
  const focus = debounce(() => setFocused(true), 250);

  const posterSpring = useSpring({
    transform: focused ? "scale3d(1,1,1)" : "scale3d(0.67,0.67,1)",
  });

  const actionsSpring = useSpring({
    transform:
      infoState === "actions" ? "translateX(0px)" : "translateX(240px)",
  });

  const ratingsSpring = useSpring({
    transform:
      infoState === "ratings" ? "translateX(0px)" : "translateX(-240px)",
  });

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
    <>
      <MovieContainer
        key={movie.id}
        sx={[focused && movieContainerFocused]}
        onMouseEnter={focus}
        onMouseLeave={() => {
          focus.cancel();
          setFocused(false);
        }}
        ref={ref}
      >
        <MoviePosterContainer>
          <MoviePoster movie={movie} />
        </MoviePosterContainer>

        <MovieDetailPositioner
          sx={[focused && movieDetailPositionerFocused]}
          onClick={() => setExpanded(true)}
        >
          <MovieDetail style={posterSpring}>
            <OverflowWrapper>
              <MoviePoster movie={movie} height={375} />

              <InfoLayout>
                <StarRatingLayout
                  onMouseEnter={switchToRatings}
                  onMouseLeave={() => {
                    switchToRatings.cancel();
                    setInfoState("actions");
                  }}
                >
                  <FiveStarRating ratings={movie.ratings} />
                </StarRatingLayout>

                <InfoRuntime>{formatRuntime(movie.runtime)}</InfoRuntime>

                <InfoFooterLayout style={actionsSpring}>
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
                </InfoFooterLayout>

                <InfoFooterLayout style={ratingsSpring}>
                  <Ratings ratings={movie.ratings} size="small" dense />
                </InfoFooterLayout>
              </InfoLayout>

              <SourceLayout>
                <Source source={movie.source} />
              </SourceLayout>
            </OverflowWrapper>
          </MovieDetail>
        </MovieDetailPositioner>
      </MovieContainer>

      <Expanded
        movie={movie}
        preload={focused}
        open={expanded}
        centerPoint={centerPoint}
        onClose={() => setExpanded(false)}
      />
    </>
  );
};

export default Movie;
