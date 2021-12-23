import { styled } from "@mui/material";

export const EmptyList = styled("div")(({ theme: { spacing } }) => ({
  display: "grid",
  gridAutoFlow: "row",
  justifyItems: "center",
  marginTop: spacing(8),
  height: "fit-content",
  gap: spacing(4),
}));

export const Quote = styled("div")(({ theme: { palette } }) => ({
  fontFamily: "serif",
  fontSize: "1.25rem",
  fontStyle: "italic",
  color: palette.grey[500],
}));

export const Message = styled("div")(({ theme: { palette, spacing } }) => ({
  textAlign: "center",
  fontSize: "1.25rem",
  color: palette.grey[800],
  padding: `${spacing(2)}px 0`,
}));
