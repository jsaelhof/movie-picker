import styles from "./profile-menu.module.css";

import React, { useRef, useState } from "react";
import {
  Avatar,
  ClickAwayListener,
  Popover,
  Paper,
  Button,
} from "@mui/material";
import { useUser } from "@auth0/nextjs-auth0";
import Link from "next/link";

const ProfileMenu = () => {
  const anchorRef = useRef(null);
  const { user } = useUser();
  const [open, setOpen] = useState(false);
  const onOpenMenu = () => setOpen(true);
  const onCloseMenu = () => setOpen(false);

  return user ? (
    <div className={styles.profile}>
      <Avatar
        ref={anchorRef}
        alt={user.name}
        src={user.picture}
        className={styles.avatarButton}
        onClick={onOpenMenu}
      />

      <Popover
        open={open}
        anchorEl={anchorRef.current}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: -8,
          horizontal: 0,
        }}
        className={styles.popper}
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
              <div className={styles.profileEmail}>{user.email}</div>
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
      </Popover>
    </div>
  ) : null;
};

export default ProfileMenu;
