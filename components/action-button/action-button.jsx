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
  fontSize = 20,
  critical,
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
      $critical={critical}
      sx={[disabled && buttonContainerDisabled, { fontSize }]}
      onClick={(e) => {
        e.stopPropagation();
        !disabled && onClick(movie);
      }}
    >
      <Icon fontSize="inherit" />
    </ButtonContainer>
  </Tooltip>
);

export default ActionButton;
