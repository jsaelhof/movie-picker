import { styled } from "@mui/material";

const borderSize = 3;
const size = 40;

export const SourceLayout = styled("div")(({ theme: { spacing } }) => ({
  display: "grid",
  gridTemplateAreas: `"main"`,
  width: size + borderSize * 2,
  height: size + borderSize * 2,
  borderRadius: "50%",
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
