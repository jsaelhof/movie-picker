import React from "react";
import { styled } from "@mui/material";

const ListCell = ({ children, classes, ...props }) => (
  <Cell className={classes} onClick={props.onClick} {...props}>
    {children}
  </Cell>
);

const Cell = styled("div")(({ theme: { spacing }, left, onClick }) => ({
  display: "grid",
  justifyContent: "center",
  alignItems: "center",
  padding: `${spacing(0.5)} ${spacing(2)}`,
  height: "100%",
  minHeight: 40,
  minWidth: 0,

  ...(left && {
    justifyContent: "left",
  }),

  ...(onClick && {
    cursor: "pointer",
  }),
}));

export default ListCell;
