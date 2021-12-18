import React from "react";
import { MenuItem, Button } from "@mui/material";
import { useRouter } from "next/router";

import { useAppContext } from "../../context/app-context";
import { Select } from "./db-select.styles";

const DbSelect = () => {
  const { lists, list, setList } = useAppContext();
  const { push } = useRouter();

  return (
    <div>
      {lists && list && (
        <Select
          disableUnderline
          variant="standard"
          value={list}
          onChange={({ target }) => {
            setList(target.value);
            push("/");
          }}
          renderValue={() => <Button variant="nav">{list.label}</Button>}
        >
          {lists.map((list) => (
            <MenuItem key={list.id} value={list}>
              {list.label}
            </MenuItem>
          ))}
        </Select>
      )}
    </div>
  );
};

export default DbSelect;
