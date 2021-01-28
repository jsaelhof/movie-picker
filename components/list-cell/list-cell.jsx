import clsx from "clsx";
import React from "react";

import styles from "./list-cell.module.css";

const ListCell = ({children, left, dense, locked, classes}) => (
  <div
    className={clsx(
      styles.listCell,
      left && styles.left,
      dense && styles.dense,
      locked && styles.locked,
      classes,
    )}
  >
    {children}
  </div>
);

export default ListCell;
