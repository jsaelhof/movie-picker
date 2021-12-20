import { styled } from "@mui/material";

export const Actions = styled("div")(({ theme: { spacing } }) => ({
  display: "grid",
  gridTemplateColumns: "26px 26px 26px 1fr 26px",
  gap: spacing(1),
}));
