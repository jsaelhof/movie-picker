import React, { useState } from "react";
import { ClickAwayListener, IconButton, Menu, MenuItem } from "@mui/material";
import { useRouter } from "next/router";
import MenuIcon from "@mui/icons-material/Menu";

import { useAppContext } from "../../context/app-context";
import {
  EyeIcon,
  ListIcon,
  MenuDivider,
  MovieIcon,
  NavMenu,
  RefreshIcon,
} from "./nav-hamburger.styles";

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
    <NavMenu>
      <IconButton onClick={handleClick} color="secondary" size="large">
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
                <RefreshIcon /> Pick again
              </MenuItem>
            )}

            {pathname === "/pick" && <MenuDivider variant="middle" />}

            {pathname !== "/" && (
              <MenuItem
                onClick={() => {
                  push("/");
                  handleClose();
                }}
              >
                <MovieIcon /> Movies
              </MenuItem>
            )}

            {pathname !== "/watched" && (
              <MenuItem
                onClick={() => {
                  push("/watched");
                  handleClose();
                }}
              >
                <EyeIcon /> Watched
              </MenuItem>
            )}

            <MenuDivider variant="middle" />

            {lists?.map((list) => (
              <MenuItem
                key={list.id}
                onClick={() => {
                  setList(list);
                  handleClose();
                }}
              >
                <ListIcon /> {list.label}
              </MenuItem>
            ))}
          </div>
        </ClickAwayListener>
      </Menu>
    </NavMenu>
  );
};

export default NavHamburger;
