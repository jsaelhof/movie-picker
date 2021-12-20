import { styled } from "@mui/material";

export const Cell = styled("div")(({ theme: { spacing } }) => ({
  display: "grid",
  justifyContent: "center",
  alignItems: "center",
  padding: `${spacing(0.5)} ${spacing(2)}`,
  height: "100%",
  minHeight: 40,
}));

export const leftAlign = {
  justifyContent: "left",
};

export const active = {
  cursor: "pointer",
};
