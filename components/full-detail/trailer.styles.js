import { styled } from "@mui/material";
import { animated } from "react-spring";
import YouTube from "react-youtube";

export const TrailerLayout = styled(animated.div)`
  height: 100%;
`;

export const YouTubePlayer = styled(YouTube)`
  width: 100%;
  height: 100%;
`;
