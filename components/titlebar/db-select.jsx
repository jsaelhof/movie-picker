import React from "react";
import { MenuItem, Select, styled } from "@mui/material";
import { useRouter } from "next/router";

import { useAppContext } from "../../context/app-context";

const DbSelect = () => {
  const { lists, list, setList } = useAppContext();
  const { push } = useRouter();

  return (
    <div>
      {lists && list && (
        <StyledSelect
          variant="standard"
          disableUnderline
          value={list}
          onChange={({ target }) => {
            setList(target.value);
            push("/");
          }}
          renderValue={() => <MenuItem>{list.label}</MenuItem>}
        >
          {lists.map((list) => (
            <MenuItem key={list.id} value={list}>
              {list.label}
            </MenuItem>
          ))}
        </StyledSelect>
      )}
    </div>
  );
};

const StyledSelect = styled(Select)(({ theme }) => ({
  color: theme.palette.secondary.main,
  "& li": {
    // Target the rendered item, a MenuItem component, which renders an li
    paddingRight: 4,
  },
  "& .MuiSelect-icon": {
    color: theme.palette.secondary.main,
  },
}));

export default DbSelect;
