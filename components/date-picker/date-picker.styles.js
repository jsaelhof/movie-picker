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

  "@media (max-width:550px)": {
    margin: "0 auto",
    background: "transparent",
    border: "none",
  },
}));

export const RightAlignedPicker = {
  right: "unset",
  left: 0,
};

export const DrawerPicker = {
  position: "initial",
  textAlign: "center",
  paddingBottom: "1em",
};

export const DrawerPaper = ({ palette }) => ({
  background: `${palette.darkGrey[800]}EE`,
});

export const ButtonGroup = styled("div")(({ theme: { spacing } }) => ({
  display: "grid",
  gridTemplateColumns: "auto 1fr auto auto",
  columnGap: spacing(2),
  margin: "0 1em 1em",

  "@media (max-width:550px)": {
    margin: "1em 1em 0",
    columnGap: spacing(4),
  },
}));

export const Title = styled("div")(({ theme: { palette, spacing } }) => ({
  fontSize: 18,
  textAlign: "center",
  color: palette.grey[400],
  padding: `${spacing(2)} ${spacing(2)}`,
}));

export const dayPickerStyles = {
  "--rdp-accent-color": "#6494ed99",
  "--rdp-background-color": "#ffffff22",
  "--rdp-outline": "2px solid var(--rdp-accent-color)",
  fontSize: "0.9rem",
};

export const dayPickerSmallStyles = {
  "--rdp-cell-size": "32px",
  marginBottom: 0,
};
