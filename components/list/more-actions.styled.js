import { MenuList, styled } from "@mui/material";

export const CloseButton = styled("div")(({ theme: { palette, spacing } }) => ({
  color: palette.grey[700],
  display: "flex",
  justifyContent: "center",
  paddingTop: spacing(1),
  cursor: "pointer",
}));

export const Menu = styled(MenuList)(({ theme: { spacing } }) => ({
  padding: 0,
  paddingBottom: spacing(1),
}));

export const StyledIcon = styled("div")(({ theme: { spacing } }) => ({
  marginRight: spacing(1),
}));
