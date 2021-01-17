import clsx from "clsx";
import React from "react";

import styles from "./list-header-cell.module.css";

const ListHeaderCell = ({children, left}) => (
  <div className={clsx(styles.listHeader, left && styles.left)}>{children}</div>
);

export default ListHeaderCell;
