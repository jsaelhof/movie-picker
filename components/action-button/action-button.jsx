import { Tooltip } from "@material-ui/core";
import clsx from "clsx";
import noop from "lodash/noop";
import React from "react";

import styles from "./action-button.module.css";

const ActionButton = ({
  Icon,
  tooltip = "",
  movie = {},
  disabled,
  onClick,
  className,
}) => (
  <Tooltip
    title={tooltip}
    disableHoverListener={disabled}
    placement="top"
    enterDelay={1000}
    enterNextDelay={1000}
  >
    <Icon
      data-movie={JSON.stringify(movie)}
      className={clsx(styles.action, disabled && styles.disabled, className)}
      onClick={
        disabled
          ? noop
          : ({ currentTarget }) =>
              onClick(JSON.parse(currentTarget.dataset.movie))
      }
    />
  </Tooltip>
);

export default ActionButton;
