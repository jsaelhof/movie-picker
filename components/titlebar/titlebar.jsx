import React, { useRef, useState } from "react";
import { useRouter } from "next/router";
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
import DbSelect from "../db-select/db-select";
import { useAppContext } from "../../context/app-context";

const TitleBar = ({ prod }) => {
  const router = useRouter();
  const { lists, list, setList } = useAppContext();
  const { user } = useUser();
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);
  const color = prod ? "primary" : "secondary";

  const onOpenMenu = () => setOpen(true);
  const onCloseMenu = () => setOpen(false);

  return (
    <div className={styles.appBar}>
      <AppBar position="static" color={color} elevation={2}>
        <Toolbar>
          <div className={styles.title}>
            <Movie />
            <div>MD4K</div>
          </div>

          <div className={styles.nav}>
            {router.pathname !== "/watched" && (
              <Link href="/watched">Watched</Link>
            )}

            {router.pathname !== "/" && <Link href="/">Movies</Link>}

            <DbSelect
              dbs={lists}
              currentDb={list}
              onDBChange={(value) =>
                setList(lists.find(({ id }) => id === value))
              }
            />
          </div>

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
