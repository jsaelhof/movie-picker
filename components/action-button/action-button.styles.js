import { styled } from "@mui/material";

export const ButtonContainer = styled("div")(({ theme: { palette } }) => ({
  cursor: "pointer",
  color: palette.icon,

  "& :hover": {
    color: palette.accent,
  },
}));

export const buttonContainerDisabled = ({ palette }) => ({
  opacity: 0.2,
  cursor: "not-allowed",

  "& :hover": {
    color: palette.icon,
  },
});
