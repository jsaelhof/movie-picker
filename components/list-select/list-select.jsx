import {MenuItem, Select, TextField} from "@material-ui/core";
import clsx from "clsx";
import map from "lodash/map";
import React from "react";

import styles from "./list-select.module.css";

const getImage = (src) => <img src={src} width="30" height="30" />;

const ListSelect = ({value, values, labels, images, onChange, ...props}) => {
  return (
    <Select
      variant="outlined"
      className={styles.select}
      value={value || 0}
      onChange={({target}) => {
        if (onChange) onChange(target.value);
      }}
      renderValue={(value) =>
        images ? getImage(images[value]) : labels[value]
      }
      {...props}
    >
      {map(values, (value) => (
        <MenuItem key={value} value={value}>
          <div className={clsx(styles.menuItem, value === 0 && styles.italic)}>
            {images && getImage(images[value])}
            <span>{labels[value]}</span>
          </div>
        </MenuItem>
      ))}
    </Select>
  );
};

export default ListSelect;
