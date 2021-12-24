import React, { useState } from "react";
import { ClickAwayListener, IconButton, Menu, MenuItem } from "@mui/material";
import { useRouter } from "next/router";
import MenuIcon from "@mui/icons-material/Menu";

import { useAppContext } from "../../context/app-context";
import {
  AddListIcon,
  EyeIcon,
  ListIcon,
  MenuDivider,
  MovieIcon,
  NavMenu,
  RefreshIcon,
} from "./nav-hamburger.styles";

const NavHamburger = () => {
  const { push, pathname } = useRouter();
  const { lists, setList, setPick, list } = useAppContext();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  if (pathname === "/create" && !list) return null;

  return (
    <NavMenu>
      <IconButton onClick={handleClick} color="secondary" size="large">
        <MenuIcon />
      </IconButton>

      <Menu anchorEl={anchorEl} open={open}>
        <ClickAwayListener onClickAway={handleClose}>
          <div>
            {pathname === "/pick" && (
              <>
                <MenuItem
                  onClick={() => {
                    setPick(null);
                    handleClose();
                  }}
                >
                  <RefreshIcon /> Pick again
                </MenuItem>

                <MenuDivider variant="middle" />
              </>
            )}

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

            {pathname !== "/create" && (
              <>
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

                <MenuItem
                  sx={{ fontStyle: "italic" }}
                  onClick={() => {
                    push("/create");
                    handleClose();
                  }}
                >
                  <AddListIcon /> New List
                </MenuItem>
              </>
            )}
          </div>
        </ClickAwayListener>
      </Menu>
    </NavMenu>
  );
};

export default NavHamburger;
