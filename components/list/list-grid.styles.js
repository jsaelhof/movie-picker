import { styled } from "@mui/material";

export const MovieList = styled("div")(({ theme: { spacing } }) => ({
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, 160px)",
  gap: spacing(2),
  marginTop: spacing(3),
  marginBottom: 200,
  justifyContent: "center",
}));
