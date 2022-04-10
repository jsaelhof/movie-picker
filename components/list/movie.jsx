import React, { useRef, useState } from "react";
import { useSpring } from "react-spring";
import { debounce } from "lodash";

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
import FiveStarRating from "../ratings/five-star-rating";
import Source from "./source";
import Expanded from "./expanded";
import { useResponsive } from "../../hooks/use-responsive";
import { useUpdateMovie } from "../../graphql/mutations/update-movie";

const getCenterPoint = (rect) => {
  if (!rect) return undefined;

  const { x, y, width, height } = rect;
  return { x: x + width / 2, y: y + height / 2 };
};

const Movie = ({ movie, onEditMovie, onMarkWatched, onDeleteMovie }) => {
  const { mobile } = useResponsive();

  const ref = useRef();
  const centerPoint = getCenterPoint(ref.current?.getBoundingClientRect());

  const [infoState, setInfoState] = useState("actions");
  const [focused, setFocused] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const switchToRatings = debounce(() => setInfoState("ratings"), 250);
  const focus = debounce(() => setFocused(true), 250);
  const unfocus = () => {
    focus.cancel();
    setFocused(false);
  };

  const posterSpring = useSpring({
    transform: focused
      ? mobile
        ? "scale3d(0.95, 0.95, 0.95)"
        : "scale3d(1,1,1)"
      : "scale3d(0.67,0.67,1)",
  });

  const actionsSpring = useSpring({
    transform:
      infoState === "actions" ? "translateX(0px)" : "translateX(240px)",
  });

  const ratingsSpring = useSpring({
    transform:
      infoState === "ratings" ? "translateX(0px)" : "translateX(-240px)",
  });

  const closeExpanded = () => setExpanded(false);

  useUpdateMovie(movie, focused);

  return (
    <>
      <MovieContainer
        key={movie.id}
        sx={[focused && movieContainerFocused]}
        onMouseOver={focus}
        onMouseEnter={focus}
        onMouseLeave={unfocus}
        ref={ref}
      >
        <MoviePosterContainer>
          <MoviePoster movie={movie} />
        </MoviePosterContainer>

        <MovieDetailPositioner
          sx={[focused && movieDetailPositionerFocused]}
          onClick={() => {
            unfocus();
            setExpanded(true);
          }}
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
                  // This prevents the card from expanding when tapping the stars on mobile to
                  // display the ratings breakdown.
                  onClick={(e) => {
                    if (
                      "ontouchstart" in window ||
                      navigator.msMaxTouchPoints > 0
                    ) {
                      e.stopPropagation();
                    }
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
                    onDelete={() => {
                      setFocused(false);
                      onDeleteMovie(movie);
                    }}
                  />
                </InfoFooterLayout>

                <InfoFooterLayout style={ratingsSpring}>
                  <Ratings ratings={movie.ratings} size="small" dense />
                </InfoFooterLayout>

                <SourceLayout>
                  <Source source={movie.source} />
                </SourceLayout>
              </InfoLayout>
            </OverflowWrapper>
          </MovieDetail>
        </MovieDetailPositioner>
      </MovieContainer>

      <Expanded
        movie={movie}
        preload={focused}
        open={expanded}
        centerPoint={centerPoint}
        onClose={closeExpanded}
      />
    </>
  );
};

export default React.memo(Movie);
