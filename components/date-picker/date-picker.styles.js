import { styled } from "@mui/material";
import { animated } from "react-spring";

export const Picker = styled(animated.div)(({ theme: { palette } }) => ({
  position: "absolute",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  background: `${palette.darkGrey[800]}EE`,
  color: palette.grey[400],
  border: "1px solid rgba(0, 0, 0, 0.25)",
  top: 0,
  bottom: 0,
  right: 0,
}));

export const RightAlignedPicker = {
  right: "unset",
  left: 0,
};

export const DrawerPicker = {
  position: "initial",
  textAlign: "center",
};

export const ButtonGroup = styled("div")(() => ({
  display: "grid",
  gridTemplateColumns: "auto 1fr 48px auto",
  margin: "0 1em 1em",
}));
