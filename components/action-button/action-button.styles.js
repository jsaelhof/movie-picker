import { styled } from "@mui/material";

export const ButtonContainer = styled("div")(
  ({ $critical, theme: { palette } }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "auto",
    width: 24,
    height: 24,
    cursor: "pointer",
    color: palette.icon,

    "& :hover": {
      color: $critical ? palette.warning.dark : palette.accent,
    },
  })
);

export const buttonContainerDisabled = ({ palette }) => ({
  opacity: 0.2,
  cursor: "not-allowed",

  "& :hover": {
    color: palette.icon,
  },
});
