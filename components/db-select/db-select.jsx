import React from "react";
import { MenuItem, Select } from "@material-ui/core";
import map from "lodash/map";

import styles from "./db-select.module.css";

const DbSelect = ({ dbs, currentDb, onDBChange }) => (
  <div className={styles.main}>
    {dbs && currentDb && (
      <Select
        variant="standard"
        disableUnderline
        margin="dense"
        classes={{ root: styles.dbSelect, icon: styles.arrowIcon }}
        value={currentDb.id}
        onChange={({ target }) => {
          onDBChange(target.value);
        }}
        renderValue={() => (
          <MenuItem className={styles.dbSelectRender}>
            {currentDb.label}
          </MenuItem>
        )}
      >
        {map(dbs, ({ id, label }) => (
          <MenuItem key={id} value={id}>
            {label}
          </MenuItem>
        ))}
      </Select>
    )}
  </div>
);

export default DbSelect;
