import { Paper, styled } from "@mui/material";
import { animated } from "react-spring";

import MoviePoster from "../movie-poster/movie-poster";

export const MovieContainer = styled(animated.div)(() => ({
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
  marginTop: `calc((250px - 375px) / 2)`,
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
  transform: scale3d(0.67, 0.67, 1);
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

// export const DetailPosterLayout = styled("div")`
//   position: relative;
//   z-index: 5;
// `;

const borderSize = 3;
const offset = 8;
const size = 40;

export const Source = styled("div")(({ theme: { spacing } }) => ({
  position: "absolute",
  display: "grid",
  gridTemplateAreas: `"main"`,
  width: size + borderSize * 2,
  height: size + borderSize * 2,
  borderRadius: "50%",
  left: spacing(2),
  bottom: 80 - size / 2 - borderSize / 2 - offset,
  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
  overflow: "hidden",
}));

export const SourceImage = styled("div")(() => ({
  width: "100%",
  height: "100%",
  backgroundSize: "contain",
  border: `solid ${borderSize}px transparent`,
  gridArea: "main",
  backgroundClip: "padding-box",
  borderRadius: "inherit",
  boxSizing: "border-box",
}));

export const SourceBorder = styled("div")(() => ({
  width: "100%",
  height: "100%",
  background: "linear-gradient(to top, #131313, #434343)",
  gridArea: "main",
}));

const infoPanelHeight = 80;

export const Info = styled(animated.div)(({ theme: { palette, spacing } }) => ({
  display: "grid",
  gridTemplateAreas: `
    "top"
    "bottom"
  `,
  gridTemplateRows: "max-content 1fr",
  justifyItems: "center",
  alignItems: "end",
  position: "relative", // This is weird, i don't need this but without it, the locked posters (0.3 opacity) appear over top. Opaque unlocked posters do not.
  fontSize: 14,
  color: palette.grey[300],
  padding: `${spacing(1)} ${spacing(2)} ${spacing(2)}`,
  background: `linear-gradient(to top, ${palette.common.black}, #434343)`,
  height: infoPanelHeight - 20,
  marginTop: -32,
}));

export const InfoData = styled("div")(() => ({
  display: "grid",
  gridArea: "top",
  gridTemplateAreas: `". rating runtime"`,
  gridTemplateColumns: "repeat(3, 1fr)",
  alignItems: "end",
}));

export const InfoRuntime = styled("div")`
  grid-area: runtime;
  text-align: right;
`;

export const InfoBottomRow = styled(animated.div)`
  grid-area: bottom;
`;

export const StarRatingLayout = styled("div")`
  grid-area: rating;
`;

// export const Info = styled(animated.div)(({ theme: { palette, spacing } }) => ({
//   display: "grid",
//   gap: 20,
//   fontSize: 14,
//   color: palette.grey[900],
//   padding: `${spacing(1)} ${spacing(2)}`,
//   background: "white",
//   height: "fit-content",
//   boxShadow: "inset 0 4px 5px -3px rgb(0, 0, 0, 0.4)",
// }));

// export const InfoData = styled("div")`
//   display: flex;
//   justify-content: space-between;
// `;

// export const InfoRatings = styled("div")(() => ({
//   justifySelf: "center",
// }));

// export const MoreActionsDrawer = styled(animated.div)(() => ({
//   position: "fixed",
//   width: "100%",
//   zIndex: 20,
//   pointerEvents: "none",
// }));

// export const moreActionsOpen = {
//   pointerEvents: "all",
// };
