import React, { useRef, useState } from "react";
import {
  Avatar,
  ClickAwayListener,
  Popover,
  Paper,
  Button,
  styled,
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
              <Link href="/api/auth/logout">
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

const Profile = styled("div")`
  grid-area: profile;
`;

const AvatarButton = styled(Avatar)`
  border: 1px solid rgba(0, 0, 0, 0.2);
`;

const ProfilePaper = styled(Paper)`
  min-width: 200px;
  max-width: 300px;
`;

const ProfileAvatar = styled("div")(({ theme: { palette, spacing } }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  margin: `0 ${spacing(2)}`,
  padding: `${spacing(2)} 0`,
  borderBottom: `1px solid ${palette.grey[400]}`,
}));

const AppBarAvatar = styled(Avatar)`
  width: 65px;
  height: 65px;
`;

const ProfileName = styled("div")(({ theme: { spacing } }) => ({
  marginTop: spacing(2),
}));

const ProfileEmail = styled("div")(({ theme: { spacing } }) => ({
  marginTop: spacing(0.5),
  fontSize: "0.75em",
  opacity: 0.7,
}));

const ProfileActions = styled("div")(({ theme: { spacing } }) => ({
  textAlign: "center",
  padding: `${spacing(2)} 0`,

  "& :first-child": {
    textTransform: "capitalize",
  },
}));

export default ProfileMenu;
