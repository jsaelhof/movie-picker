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

const StyledSelect = styled(Select)`
  /* simulate margin=dense */
  margin-top: ${({ theme: { spacing } }) => spacing(1)};
  /* simulate margin=dense */
  margin-bottom: ${({ theme: { spacing } }) => spacing(0.5)};
  /* Grrr...make the height line up */
  height: 41;

  & > :first-child {
    padding-top: 0;
    padding-bottom: 0;
  }
`;
export default ListSelect;
