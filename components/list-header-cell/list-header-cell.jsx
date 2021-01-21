import clsx from "clsx";
import noop from "lodash/noop";
import React from "react";

import styles from "./list-header-cell.module.css";

const ListHeaderCell = ({children, left, onClick}) => (
  <div
    className={clsx(
      styles.listHeader,
      left && styles.left,
      onClick && styles.pointer,
    )}
    onClick={onClick || noop}
  >
    {children}
  </div>
);

export default ListHeaderCell;
