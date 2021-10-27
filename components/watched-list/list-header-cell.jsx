import React from "react";
import { styled } from "@mui/material";

const ListHeaderCell = ({ children, ...props }) => (
  <Cell {...props}>{children}</Cell>
);

const Cell = styled("div")(({ theme: { palette, spacing }, left }) => ({
  display: "flex",
  fontSize: "0.8em",
  fontWeight: 700,
  color: palette.darkBlue[500],
  marginBottom: spacing(0.5),
  borderBottom: "1px solid #eee",
  padding: `${spacing(1)} ${spacing(2)} ${spacing(2)}`,
  justifyContent: "center",
  cursor: "default",

  ...(left && {
    justifyContent: "left",
  }),
}));

export default ListHeaderCell;
