import { styled } from "@mui/material";

export const Container = styled("div")(() => ({
  display: "grid",
  gridAutoFlow: "column",
  gap: 72,
  margin: "32px 0",
}));

export const ActionImage = styled("img")(() => ({
  height: 20,
  opacity: 0.25,
  cursor: "pointer",
}));
