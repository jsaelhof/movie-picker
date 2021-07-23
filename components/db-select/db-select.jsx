import { MenuItem, Select } from "@material-ui/core";
import map from "lodash/map";
import Storage from "@material-ui/icons/Storage";

import styles from "./db-select.module.css";

const DbSelect = ({ dbs, currentDb, onDBChange }) => (
  <div className={styles.main}>
    {dbs && currentDb && (
      <Select
        variant="outlined"
        margin="dense"
        classes={{ root: styles.dbSelect }}
        value={currentDb.id}
        onChange={({ target }) => {
          onDBChange(target.value);
        }}
        renderValue={(id) => (
          <MenuItem className={styles.dbSelectRender}>
            <Storage className={styles.dbSelectIcon} />
            {currentDb.label}
          </MenuItem>
        )}
      >
        {map(dbs, ({ id, label }) => (
          <MenuItem key={id} value={id}>
            <Storage className={styles.dbSelectIcon} />
            {label}
          </MenuItem>
        ))}
      </Select>
    )}
  </div>
);

export default DbSelect;
