import styles from "./profile-menu.module.css";

import React, { useRef, useState } from "react";
import {
  Avatar,
  ClickAwayListener,
  Grow,
  Popper,
  Paper,
  Button,
} from "@material-ui/core";
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
        className={styles.popper}
      >
        {({ TransitionProps }) => (
          <Grow {...TransitionProps}>
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
          </Grow>
        )}
      </Popper>
    </div>
  ) : null;
};

export default ProfileMenu;
