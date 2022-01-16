import { styled } from "@mui/material";
import { animated } from "react-spring";
import YouTube from "react-youtube";

export const TrailerLayout = styled(animated.div)`
  height: 100%;
  position: relative;
`;

export const YouTubePlayer = styled(YouTube)(({ width, height }) => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%,-50%)",
  width,
  height,
}));
