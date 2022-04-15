import React, { useRef, useState } from "react";
import { ClickAwayListener, Popover, Button } from "@mui/material";
import { useUser } from "@auth0/nextjs-auth0";
import Link from "next/link";

import {
  AppBarAvatar,
  AvatarButton,
  Profile,
  ProfileActions,
  ProfileAvatar,
  ProfileEmail,
  ProfileName,
  ProfilePaper,
} from "./profile-menu.styles";

const ProfileMenu = () => {
  const anchorRef = useRef(null);
  const { user } = useUser();
  const [open, setOpen] = useState(false);
  const onOpenMenu = () => setOpen(true);
  const onCloseMenu = () => setOpen(false);

  return user ? (
    <Profile>
      <AvatarButton
        ref={anchorRef}
        alt={user.name}
        src={user.picture}
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
      >
        <ClickAwayListener onClickAway={onCloseMenu}>
          <ProfilePaper elevation={10}>
            <ProfileAvatar>
              <AppBarAvatar alt={user.name} src={user.picture} />
              <ProfileName>{user.name}</ProfileName>
              <ProfileEmail>{user.email}</ProfileEmail>
            </ProfileAvatar>

            <ProfileActions>
              <Link href="/api/auth/logout" passHref>
                <Button variant="outlined" onClick={onCloseMenu}>
                  Logout
                </Button>
              </Link>
            </ProfileActions>
          </ProfilePaper>
        </ClickAwayListener>
      </Popover>
    </Profile>
  ) : null;
};

export default ProfileMenu;
