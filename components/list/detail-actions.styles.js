import { styled } from "@mui/material";

export const Actions = styled("div")(({ theme: { spacing } }) => ({
  display: "grid",
  gridTemplateColumns: "repeat(3, 26px)",
  gap: spacing(4),
  alignItems: "center",
  marginLeft: "auto",
  marginRight: "auto",
}));
