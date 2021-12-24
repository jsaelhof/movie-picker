import React from "react";
import { MenuItem, Button, Divider } from "@mui/material";
import { useRouter } from "next/router";

import { useAppContext } from "../../context/app-context";
import { Select } from "./db-select.styles";

const NEW_LIST = "NEW_LIST";

const DbSelect = () => {
  const { lists, list, setList } = useAppContext();
  const { push } = useRouter();

  return (
    <div>
      {lists && list && (
        <Select
          disableUnderline
          variant="standard"
          value={list.id}
          onChange={({ target }) => {
            if (target.value === NEW_LIST) {
              push("/create");
            } else {
              setList(lists.find(({ id }) => id === target.value));
              push("/");
            }
          }}
          renderValue={() => <Button variant="nav">{list.label}</Button>}
        >
          {lists.map((list) => (
            <MenuItem key={list.id} value={list.id}>
              {list.label}
            </MenuItem>
          ))}
          <Divider />
          <MenuItem value={NEW_LIST} sx={{ fontStyle: "italic" }}>
            + New List
          </MenuItem>
        </Select>
      )}
    </div>
  );
};

export default DbSelect;
