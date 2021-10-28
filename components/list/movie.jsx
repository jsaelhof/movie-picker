import { Paper, styled } from "@mui/material";
import React, { useRef, useState } from "react";
import { animated, useSpring } from "react-spring";

import { formatRuntime } from "../../utils/format-runtime";
import { sourceLogos } from "../../constants/sources";
import { useResponsive } from "../../hooks/use-responsive";
import DetailActions from "./detail-actions";
import MoreActions from "./more-actions";
import Ratings from "../ratings/ratings";
import MoviePoster from "../movie-poster/movie-poster";

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
    <MovieWrapper
      key={movie.id}
      $focused={focused}
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

      <MovieDetailPositioner $focused={focused}>
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

              <InfoRatings size="small" ratings={movie.ratings} />

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
                $show={showMoreActions}
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
    </MovieWrapper>
  );
};

const MovieWrapper = styled(Paper)(({ $focused }) => ({
  position: "relative",
  borderRadius: 4,

  ...($focused && {
    zIndex: 1000,
  }),
}));

const MoviePosterContainer = styled("div")`
  border-radius: 4px;
  overflow: hidden;
  position: relative;
`;

const MovieDetailPositioner = styled("div")(({ $focused }) => ({
  width: 240,
  marginLeft: `calc((160px - 240px) / 2)` /* Use diff between zoomed and standard widths to determine horizontal offset to center */,
  marginTop: "-82px",
  position: "absolute",
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  pointerEvents: "none",
  opacity: 0,

  ...($focused && {
    pointerEvents: "initial",
    opacity: 1,
  }),
}));

const MovieDetail = styled(animated.div)`
  border-radius: 4px;
  box-shadow: 3px 10px 10px rgba(0, 0, 0, 0.1),
    0px 5px 15px 0px rgba(0, 0, 0, 0.1), 0px 1px 20px 0px rgba(0, 0, 0, 0.12);
  transform: scale(0.67);
`;

/* This div wraps the content so that the overflow is hidden in safari properly without hiding the box-shadow.
    To fix this I put the box shadow on the outer div and then put this div inside to clip the overflow. */
const OverflowWrapper = styled("div")`
  border-radius: 4px;
  overflow: hidden;
  -webkit-mask-image: -webkit-radial-gradient(
    white,
    black
  ); /* This is needed to fix the overflow: hidden bug in safari */
  background-color: white;
`;

const DetailPoster = styled(MoviePoster)`
  position: relative;
  z-index: 5;
`;

const Source = styled("div")`
  position: fixed;
  height: 40px;
  border-radius: 23px;
  border: 3px solid white;
  overflow: hidden;
  transform: translate(-50%, -50%);
  margin-left: 50%;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.15);
  z-index: 10;
`;

const Info = styled(animated.div)(({ theme: { palette, spacing } }) => ({
  display: "grid",
  gap: 20,
  fontSize: 14,
  color: palette.grey[900],
  padding: `${spacing(1)} ${spacing(2)}`,
  background: "white",
  height: "fit-content",
  boxShadow: "inset 0 4px 5px -3px rgb(0, 0, 0, 0.4)",
}));

const InfoData = styled("div")`
  display: flex;
  justify-content: space-between;
`;

const InfoRatings = styled(Ratings)`
  margin: 0 auto;
`;

const MoreActionsDrawer = styled(animated.div)(({ $show }) => ({
  position: "fixed",
  width: "100%",
  zIndex: 20,
  pointerEvents: "none",

  ...($show && {
    pointerEvents: "all",
  }),
}));

export default Movie;
