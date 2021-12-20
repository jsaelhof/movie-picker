import { Paper, styled } from "@mui/material";
import { animated } from "react-spring";

import MoviePoster from "../movie-poster/movie-poster";

export const MovieContainer = styled(Paper)(() => ({
  position: "relative",
  borderRadius: 4,
}));

export const movieContainerFocused = {
  zIndex: 1000,
};

export const MoviePosterContainer = styled("div")`
  border-radius: 4px;
  overflow: hidden;
  position: relative;
`;

export const MovieDetailPositioner = styled("div")(() => ({
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
}));

export const movieDetailPositionerFocused = {
  pointerEvents: "initial",
  opacity: 1,
};

export const MovieDetail = styled(animated.div)`
  border-radius: 4px;
  box-shadow: 3px 10px 10px rgba(0, 0, 0, 0.1),
    0px 5px 15px 0px rgba(0, 0, 0, 0.1), 0px 1px 20px 0px rgba(0, 0, 0, 0.12);
  transform: scale(0.67);
`;

/* This div wraps the content so that the overflow is hidden in safari properly without hiding the box-shadow.
      To fix this I put the box shadow on the outer div and then put this div inside to clip the overflow. */
export const OverflowWrapper = styled("div")`
  border-radius: 4px;
  overflow: hidden;
  -webkit-mask-image: -webkit-radial-gradient(
    white,
    black
  ); /* This is needed to fix the overflow: hidden bug in safari */
  background-color: white;
`;

export const DetailPoster = styled(MoviePoster)`
  position: relative;
  z-index: 5;
`;

export const Source = styled("div")`
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

export const Info = styled(animated.div)(({ theme: { palette, spacing } }) => ({
  display: "grid",
  gap: 20,
  fontSize: 14,
  color: palette.grey[900],
  padding: `${spacing(1)} ${spacing(2)}`,
  background: "white",
  height: "fit-content",
  boxShadow: "inset 0 4px 5px -3px rgb(0, 0, 0, 0.4)",
}));

export const InfoData = styled("div")`
  display: flex;
  justify-content: space-between;
`;

export const InfoRatings = styled("div")(() => ({
  justifySelf: "center",
}));

export const MoreActionsDrawer = styled(animated.div)(() => ({
  position: "fixed",
  width: "100%",
  zIndex: 20,
  pointerEvents: "none",
}));

export const moreActionsOpen = {
  pointerEvents: "all",
};
