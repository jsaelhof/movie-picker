import { styled } from "@mui/material";
import { animated } from "@react-spring/web";

export const ExpandedBackdrop = styled(animated.div)(() => ({
  position: "fixed",
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
  background: "rgba(0,0,0,70%)",
  zIndex: 10000,
}));

export const ExpandedContent = styled(animated.div)(() => ({
  position: "fixed",
  borderRadius: 8,
  width: "90vw",
  height: "calc(100vh - 32px)",
  background: "white",
  overflow: "hidden",
  zIndex: 10001,
  left: "4.98vw", // This should be 5vw (1/2 the 10vw the content doesn't fill, to center it) but 5 causes a tear on the edge of the picture background. So does 4.99. No idea why.
  top: 16,
}));
