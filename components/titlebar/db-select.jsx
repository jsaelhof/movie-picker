import React from "react";
import { MenuItem, Select } from "@mui/material";
import { useRouter } from "next/router";

import { useAppContext } from "../../context/app-context";

import styles from "./db-select.module.css";

const DbSelect = () => {
  const { lists, list, setList } = useAppContext();
  const { push } = useRouter();

  return (
    <div className={styles.main}>
      {lists && list && (
        <Select
          disableUnderline
          margin="dense"
          classes={{ root: styles.dbSelect, icon: styles.selectIcon }}
          value={list}
          onChange={({ target }) => {
            setList(target.value);
            push("/");
          }}
          renderValue={() => (
            <MenuItem className={styles.dbSelectRender}>{list.label}</MenuItem>
          )}
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
