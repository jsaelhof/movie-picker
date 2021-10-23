import React, { useState } from "react";
import {
  styled,
  ClickAwayListener,
  Divider,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import { useRouter } from "next/router";
import MenuIcon from "@mui/icons-material/Menu";
import Refresh from "@mui/icons-material/Refresh";
import Eye from "@mitch528/mdi-material-ui/Eye";
import Movie from "@mitch528/mdi-material-ui/Movie";
import List from "@mui/icons-material/FormatListBulleted";

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
                <MovieIcon />
                Movies
              </MenuItem>
            )}

            {pathname !== "/watched" && (
              <MenuItem
                onClick={() => {
                  push("/watched");
                  handleClose();
                }}
              >
                <EyeIcon />
                Watched
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

const NavMenu = styled("div")(({ theme: { spacing } }) => ({
  gridArea: "nav",
  marginRight: spacing(2),
}));

const icon = ({ theme: { palette, spacing } }) => ({
  marginRight: spacing(2),
  color: palette.grey[600],
});

const RefreshIcon = styled(Refresh)(icon);
const ListIcon = styled(List)(icon);
const EyeIcon = styled(Eye)(icon);
const MovieIcon = styled(Movie)(icon);

const MenuDivider = styled(Divider)(({ theme: { spacing } }) => ({
  marginTop: spacing(0.5),
  marginBottom: spacing(0.5),
}));

export default NavHamburger;
