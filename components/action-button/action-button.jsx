import { Tooltip } from "@mui/material";
import React from "react";

import {
  ButtonContainer,
  buttonContainerDisabled,
} from "./action-button.styles";

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
      sx={[disabled && buttonContainerDisabled]}
      onClick={(e) => {
        e.stopPropagation();
        !disabled && onClick(movie);
      }}
    >
      <Icon />
    </ButtonContainer>
  </Tooltip>
);

export default ActionButton;
