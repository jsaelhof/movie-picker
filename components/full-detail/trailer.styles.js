import { styled } from "@mui/material";
import { animated } from "react-spring";
import YouTube from "react-youtube";

export const TrailerInline = styled(animated.div)`
  height: 100%;
  position: relative;
`;

export const TrailerOverlay = styled(animated.div)`
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

export const YouTubePlayerInline = styled(YouTube)(({ width, height }) => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%,-50%)",
  width,
  height,
}));

export const YouTubePlayerOverlay = styled(YouTube)(() => ({
  boxShadow: "4px 10px 10px rgb(0 0 0 / 30%)",
  border: "2px solid #333",
  width: "90vw",
  height: "calc(90vw * (1 / 1.778))",
  backgroundColor: "black",
}));
