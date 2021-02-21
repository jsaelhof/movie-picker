import {
  Button,
  ButtonGroup,
  ClickAwayListener,
  MenuItem,
  MenuList,
  Paper,
} from "@material-ui/core";
import {useState} from "react";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ClockIcon from "mdi-material-ui/ClockOutline";
import ClockFastIcon from "mdi-material-ui/ClockFast";
import TimerSandIcon from "mdi-material-ui/TimerSand";

import styles from "./split-button.module.css";

const splitButtonItems = [
  {
    value: 0,
    label: "Pick a Short Movie",
    options: {maxRuntime: 6000},
    Icon: ClockFastIcon,
  },
  {
    value: 1,
    label: "Pick a Regular Movie",
    options: {minRuntime: 6001, maxRuntime: 7800},
    Icon: ClockIcon,
  },
  {
    value: 2,
    label: "Pick a Long Movie",
    options: {minRuntime: 7801},
    Icon: TimerSandIcon,
  },
];

const SplitButton = ({onPick}) => {
  const [openSplitButton, setOpenSplitButton] = useState(false);

  return (
    <ButtonGroup className={styles.splitButton}>
      <Button
        className={styles.mainButton}
        variant="contained"
        color="primary"
        onClick={() => onPick()}
      >
        <img src="/images/random.png" className={styles.random} />
        Pick A Movie
      </Button>
      <Button
        className={styles.secondaryButton}
        variant="contained"
        size="small"
        color="primary"
        onClick={() => setOpenSplitButton(true)}
      >
        <ArrowDropDownIcon />
      </Button>

      {openSplitButton && (
        <Paper className={styles.splitButtonPaper}>
          <ClickAwayListener onClickAway={() => setOpenSplitButton(false)}>
            <MenuList id="split-button-menu">
              {splitButtonItems.map(({value, label, Icon, options}) => (
                <MenuItem
                  key={value}
                  onClick={() => onPick(options)}
                  className={styles.splitButtonMenuItem}
                >
                  {<Icon className={styles.icon} />}
                  {label}
                </MenuItem>
              ))}
            </MenuList>
          </ClickAwayListener>
        </Paper>
      )}
    </ButtonGroup>
  );
};

export default SplitButton;
