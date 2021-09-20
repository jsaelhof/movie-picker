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
import Eye from "mdi-material-ui/Eye";
import Movie from "mdi-material-ui/Movie";
import List from "@material-ui/icons/FormatListBulleted";

import { useAppContext } from "../../context/app-context";

const NavHamburger = () => {
  const router = useRouter();
  const { lists, setList } = useAppContext();
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
      <IconButton onClick={handleClick}>
        <MenuIcon className={styles.menuIcon} />
      </IconButton>

      <Menu anchorEl={anchorEl} open={open}>
        <ClickAwayListener onClickAway={handleClose}>
          <div>
            {router.pathname !== "/" && (
              <MenuItem
                onClick={() => {
                  router.push("/");
                  handleClose();
                }}
              >
                <Movie className={styles.icon} /> Movies
              </MenuItem>
            )}

            {router.pathname !== "/watched" && (
              <MenuItem
                onClick={() => {
                  router.push("/watched");
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
