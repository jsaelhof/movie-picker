import styles from "./nav-hamburger.module.css";

import React, { useState } from "react";
import {
  ClickAwayListener,
  Divider,
  IconButton,
  Menu,
  MenuItem,
} from "@material-ui/core";
import { useRouter } from "next/router";
import MenuIcon from "@material-ui/icons/Menu";
import Refresh from "@material-ui/icons/Refresh";
import Eye from "mdi-material-ui/Eye";
import Movie from "mdi-material-ui/Movie";
import List from "@material-ui/icons/FormatListBulleted";

import { useAppContext } from "../../context/app-context";

const NavHamburger = () => {
  const { push, pathname } = useRouter();
  const { lists, setList, setPick } = useAppContext();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={styles.menu}>
      <IconButton onClick={handleClick} color="secondary">
        <MenuIcon />
      </IconButton>

      <Menu anchorEl={anchorEl} open={open}>
        <ClickAwayListener onClickAway={handleClose}>
          <div>
            {pathname === "/pick" && (
              <MenuItem
                onClick={() => {
                  setPick(null);
                  handleClose();
                }}
              >
                <Refresh className={styles.icon} /> Pick again
              </MenuItem>
            )}

            {pathname === "/pick" && (
              <Divider variant="middle" className={styles.divider} />
            )}

            {pathname !== "/" && (
              <MenuItem
                onClick={() => {
                  push("/");
                  handleClose();
                }}
              >
                <Movie className={styles.icon} /> Movies
              </MenuItem>
            )}

            {pathname !== "/watched" && (
              <MenuItem
                onClick={() => {
                  push("/watched");
                  handleClose();
                }}
              >
                <Eye className={styles.icon} /> Watched
              </MenuItem>
            )}

            <Divider variant="middle" className={styles.divider} />

            {lists?.map((list) => (
              <MenuItem
                key={list.id}
                onClick={() => {
                  setList(list);
                  handleClose();
                }}
              >
                <List className={styles.icon} /> {list.label}
              </MenuItem>
            ))}
          </div>
        </ClickAwayListener>
      </Menu>
    </div>
  );
};

export default NavHamburger;
