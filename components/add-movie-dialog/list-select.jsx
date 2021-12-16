import { MenuItem, Select } from "@mui/material";
import map from "lodash/map";
import React from "react";
import ListSelectItem from "./list-select-item";

import styles from "./list-select.module.css";

const ListSelect = ({
  value,
  values,
  onChange,
  hideLabelForSelection,
  ...props
}) => {
  return (
    <Select
      margin="dense"
      variant="outlined"
      className={styles.select}
      value={value || 0}
      onChange={({ target }) => {
        if (onChange) onChange(target.value);
      }}
      renderValue={(value) => (
        <ListSelectItem
          hideLabelForSelection={hideLabelForSelection}
          value={value}
          {...props}
        />
      )}
      {...props}
    >
      {map(values, (value) => (
        <MenuItem key={value} value={value}>
          <ListSelectItem value={value} {...props} />
        </MenuItem>
      ))}
    </Select>
  );
};

export default ListSelect;
