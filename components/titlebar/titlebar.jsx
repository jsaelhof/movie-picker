import { useRef, useState } from "react";
import {
  AppBar,
  Avatar,
  ClickAwayListener,
  Grow,
  Popper,
  Paper,
  Toolbar,
  Button,
} from "@material-ui/core";
import { useUser } from "@auth0/nextjs-auth0";
import Link from "next/link";
import Movie from "@material-ui/icons/Movie";

import styles from "./titlebar.module.css";

const config = {
  development: {
    title: "Movie Decider 4000 - Development",
    color: "secondary",
  },
  production: {
    title: "Movie Decider 4000",
    color: "primary",
  },
};

const TitleBar = ({ prod }) => {
  const { user } = useUser();
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);
  const { title, color } = config[prod ? "production" : "development"];

  const onOpenMenu = () => setOpen(true);
  const onCloseMenu = () => setOpen(false);

  return (
    <div className={styles.appBar}>
      <AppBar position="static" color={color} elevation={2}>
        <Toolbar>
          <Movie />
          <div className={styles.title}>{title}</div>
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
                    <ClickAwayListener onClickAway={onCloseMenu}>
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
                          <div className={styles.profileEmail}>
                            {user.email}
                          </div>
                        </div>

                        <div className={styles.profileActions}>
                          <Link href="/api/auth/logout">
                            <Button variant="outlined" onClick={onCloseMenu}>
                              Logout
                            </Button>
                          </Link>
                        </div>
                      </Paper>
                    </ClickAwayListener>
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
