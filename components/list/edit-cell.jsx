import React from "react";
import ListCell from "./list-cell";

import styles from "./edit-cell.module.css";

const EditCell = (props) => <ListCell {...props} classes={styles.editCell} />;

export default EditCell;
