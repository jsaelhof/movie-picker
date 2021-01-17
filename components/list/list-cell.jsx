import clsx from "clsx";
import React from "react";

import styles from "./list-cell.module.css";

const ListCell = ({children, left, dense, classes}) => (
  <div
    className={clsx(
      styles.listCell,
      left && styles.left,
      dense && styles.dense,
      classes,
    )}
  >
    {children}
  </div>
);

export default ListCell;
