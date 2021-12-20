import { Tooltip } from "@mui/material";
import noop from "lodash/noop";
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
      onClick={disabled ? noop : () => onClick(movie)}
    >
      <Icon />
    </ButtonContainer>
  </Tooltip>
);

export default ActionButton;
