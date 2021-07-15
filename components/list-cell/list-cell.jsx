import clsx from "clsx";
import React from "react";

import styles from "./list-cell.module.css";

const ListCell = ({
  children,
  left,
  dense,
  locked,
  onClick,
  classes,
  ...props
}) => (
  <div
    className={clsx(
      styles.listCell,
      left && styles.left,
      dense && styles.dense,
      locked && styles.locked,
      onClick && styles.button,
      classes
    )}
    onClick={onClick}
    {...props}
  >
    {children}
  </div>
);

export default ListCell;
