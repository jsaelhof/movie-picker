import React from "react";

import { active, Cell, leftAlign } from "./list-cell.styles";

const ListCell = ({ children, classes, left, onClick, id }) => (
  <Cell
    data-id={id}
    sx={[left && leftAlign, onClick && active]}
    className={classes}
    onClick={onClick}
  >
    {children}
  </Cell>
);

export default ListCell;
