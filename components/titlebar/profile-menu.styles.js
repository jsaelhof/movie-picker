import { Avatar, Paper, styled } from "@mui/material";

export const Profile = styled("div")`
  grid-area: profile;
`;

export const AvatarButton = styled(Avatar)`
  border: 1px solid rgba(0, 0, 0, 0.2);
  cursor: pointer;
`;

export const ProfilePaper = styled(Paper)`
  min-width: 200px;
  max-width: 300px;
`;

export const ProfileAvatar = styled("div")(
  ({ theme: { palette, spacing } }) => ({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    margin: `0 ${spacing(2)}`,
    padding: `${spacing(2)} 0`,
    borderBottom: `1px solid ${palette.grey[400]}`,
  })
);

export const AppBarAvatar = styled(Avatar)`
  width: 65px;
  height: 65px;
`;

export const ProfileName = styled("div")(({ theme: { spacing } }) => ({
  marginTop: spacing(2),
}));

export const ProfileEmail = styled("div")(({ theme: { spacing } }) => ({
  marginTop: spacing(0.5),
  fontSize: "0.75em",
  opacity: 0.7,
}));

export const ProfileActions = styled("div")(({ theme: { spacing } }) => ({
  textAlign: "center",
  padding: `${spacing(2)} 0`,

  "& :first-child": {
    textTransform: "capitalize",
  },
}));
