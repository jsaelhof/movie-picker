import { MenuItem, Select, TextField } from "@mui/material";
import clsx from "clsx";
import map from "lodash/map";
import React from "react";

import styles from "./list-select.module.css";

const getImage = (src) => <img src={src} width="30" height="30" />;

const MenuItemContent = ({ images, labels, value, hideLabelForSelection }) => (
  <div className={clsx(styles.menuItem, value === 0 && styles.italic)}>
    {images && getImage(images[value])}
    {!hideLabelForSelection && <span>{labels[value]}</span>}
  </div>
);

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
        <MenuItemContent
          hideLabelForSelection={hideLabelForSelection}
          value={value}
          {...props}
        />
      )}
      {...props}
    >
      {map(values, (value) => (
        <MenuItem key={value} value={value}>
          <MenuItemContent value={value} {...props} />
        </MenuItem>
      ))}
    </Select>
  );
};

export default ListSelect;
