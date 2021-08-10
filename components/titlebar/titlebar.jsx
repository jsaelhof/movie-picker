import { useRef, useState } from "react";
import {
  AppBar,
  Avatar,
  ClickAwayListener,
  Grow,
  MenuItem,
  MenuList,
  Popper,
  Paper,
  Toolbar,
} from "@material-ui/core";
import { useUser } from "@auth0/nextjs-auth0";
import Link from "next/link";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import Movie from "@material-ui/icons/Movie";

import styles from "./titlebar.module.css";

const TitleBar = () => {
  const { user } = useUser();
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);

  const onOpenMenu = () => setOpen(true);
  const onCloseMenu = () => setOpen(false);

  return (
    <div className={styles.appBar}>
      <AppBar position="static" color="primary" elevation={2}>
        <Toolbar>
          <Movie />
          <div className={styles.title}>Movie Decider 4000</div>
          {user && (
            <div>
              <Avatar
                ref={anchorRef}
                alt={user.name}
                src={user.picture}
                onClick={onOpenMenu}
              />

              <Popper
                open={open}
                anchorEl={anchorRef.current}
                transition
                placement="bottom-end"
                modifiers={{
                  offset: {
                    enabled: true,
                    offset: "0,8",
                  },
                }}
              >
                {({ TransitionProps }) => (
                  <Grow
                    {...TransitionProps}
                    style={{
                      transformOrigin: "center top",
                    }}
                  >
                    <Paper className={styles.profileMenu} elevation={10}>
                      <div className={styles.profileAvatar}>
                        <Avatar
                          alt={user.name}
                          src={user.picture}
                          style={{
                            width: 65,
                            height: 65,
                          }}
                        />
                        <div className={styles.profileName}>{user.name}</div>
                        <div className={styles.profileEmail}>{user.email}</div>
                      </div>

                      <ClickAwayListener onClickAway={onCloseMenu}>
                        <MenuList>
                          <Link href="/api/auth/logout">
                            <MenuItem
                              onClick={onCloseMenu}
                              className={styles.profileMenuItem}
                              style={{
                                justifyContent: "center",
                              }}
                            >
                              <ExitToAppIcon /> Logout
                            </MenuItem>
                          </Link>
                        </MenuList>
                      </ClickAwayListener>
                    </Paper>
                  </Grow>
                )}
              </Popper>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default TitleBar;
