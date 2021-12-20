import React from "react";
import { Cell, leftAlign } from "./list-header-cell.styles";

const ListHeaderCell = ({ children, left }) => (
  <Cell sx={[left && leftAlign]}>{children}</Cell>
);

export default ListHeaderCell;
