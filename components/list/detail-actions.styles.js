import { styled } from "@mui/material";

export const Actions = styled("div")(({ theme: { spacing } }) => ({
  display: "grid",
  gridTemplateColumns: "repeat(4, 26px)",
  gap: spacing(3.5),
  alignItems: "center",
  marginLeft: "auto",
  marginRight: "auto",
}));
