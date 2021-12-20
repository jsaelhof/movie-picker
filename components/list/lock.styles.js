import { styled } from "@mui/material";

export const LockContainer = styled("div")(({ theme: { palette } }) => ({
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  opacity: 0.25,

  ":hover": {
    opacity: 1,
  },

  "& :hover": {
    color: palette.accent,
  },
}));

export const lockedStyles = {
  opacity: 1,
};

export const StyledIcon = styled("div")(({ theme: { palette } }) => ({
  fontSize: "1.25rem",
  color: palette.grey[600],
}));
