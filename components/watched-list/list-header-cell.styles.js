import { styled } from "@mui/material";

export const Cell = styled("div")(({ theme: { palette, spacing } }) => ({
  display: "flex",
  fontSize: "0.8em",
  fontWeight: 700,
  color: palette.darkGrey[600],
  marginBottom: spacing(0.5),
  borderBottom: "1px solid #eee",
  padding: `${spacing(1)} ${spacing(2)} ${spacing(2)}`,
  justifyContent: "center",
  cursor: "default",
}));

export const leftAlign = {
  justifyContent: "left",
};
