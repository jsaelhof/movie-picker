import React from "react";

import { active, Cell, leftAlign } from "./list-cell.styles";

const ListCell = ({ children, classes, left, onClick }) => (
  <Cell
    sx={[left && leftAlign, onClick && active]}
    className={classes}
    onClick={onClick}
  >
    {children}
  </Cell>
);

export default ListCell;
