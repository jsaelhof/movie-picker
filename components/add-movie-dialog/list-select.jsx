import { MenuItem, Select, styled } from "@mui/material";
import map from "lodash/map";
import React from "react";

import ListSelectItem from "./list-select-item";

const ListSelect = ({
  value,
  values,
  onChange,
  hideLabelForSelection,
  ...props
}) => {
  return (
    <StyledSelect
      margin="dense"
      variant="outlined"
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
    </StyledSelect>
  );
};

const StyledSelect = styled(Select)(({ theme: { spacing } }) => ({
  marginTop: spacing(1) /* simulate margin=dense */,
  marginBottom: spacing(0.5) /* simulate margin=dense */,
  height: 41 /* Grrr...make the hight line up */,

  "& > :first-child": {
    paddingTop: 0,
    paddingBottom: 0,
  },
}));

export default ListSelect;
