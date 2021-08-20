import React from "react";
import clsx from "clsx";

import ListCell from "../list-cell/list-cell";

import styles from "./edit-cell.module.css";

const EditCell = ({ classes, ...props }) => (
  <ListCell {...props} classes={clsx(styles.editCell, classes)} />
);

export default EditCell;
