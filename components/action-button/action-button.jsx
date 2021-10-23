import { Tooltip, styled } from "@mui/material";
import noop from "lodash/noop";
import React from "react";

const ActionButton = ({
  Icon,
  tooltip = "",
  movie = {},
  disabled,
  onClick,
}) => (
  <Tooltip
    title={tooltip}
    disableHoverListener={disabled}
    placement="top"
    enterDelay={1000}
    enterNextDelay={1000}
  >
    <ButtonContainer
      $disabled={disabled}
      onClick={disabled ? noop : () => onClick(movie)}
    >
      <Icon />
    </ButtonContainer>
  </Tooltip>
);

const ButtonContainer = styled("div")(({ theme: { palette } }, $disabled) => ({
  cursor: "pointer",
  color: palette.icon,

  ...($disabled && {
    opacity: 0.2,
    cursor: "not-allowed",
  }),

  "& :hover": {
    color: $disabled ? palette.icon : palette.accent,
  },
}));

export default ActionButton;
