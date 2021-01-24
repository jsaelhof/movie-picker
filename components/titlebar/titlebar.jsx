import {
  AppBar,
  Button,
  ButtonGroup,
  ClickAwayListener,
  MenuItem,
  MenuList,
  Paper,
  Toolbar,
} from "@material-ui/core";
import AddToQueueIcon from "@material-ui/icons/AddToQueue";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ClockIcon from "mdi-material-ui/ClockOutline";
import ClockFastIcon from "mdi-material-ui/ClockFast";
import TimerSandIcon from "mdi-material-ui/TimerSand";
import Movie from "@material-ui/icons/Movie";
import {useState} from "react";

import styles from "./titlebar.module.css";

const splitButtonItems = [
  {
    value: 0,
    label: "Pick a Short Movie",
    options: {minRuntime: 0, maxRuntime: 5700},
    Icon: ClockFastIcon,
  },
  {
    value: 1,
    label: "Pick a Regular Movie",
    options: {minRuntime: 5701, maxRuntime: 7800},
    Icon: ClockIcon,
  },
  {
    value: 2,
    label: "Pick a Long Movie",
    options: {minRuntime: 7801, maxRuntime: 36000},
    Icon: TimerSandIcon,
  },
];

const TitleBar = ({onAdd, onPick}) => {
  const [openSplitButton, setOpenSplitButton] = useState(false);

  return (
    <div className={styles.appBar}>
      <AppBar position="static" color="transparent" elevation={0}>
        <Toolbar className={styles.toolbar}>
          <Movie />
          <div className={styles.title}>Movie Decider 4000</div>
          <Button variant="outlined" onClick={onAdd}>
            <AddToQueueIcon className={styles.addToQueue} />
            Add Movie
          </Button>

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
                <ClickAwayListener
                  onClickAway={() => setOpenSplitButton(false)}
                >
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
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default TitleBar;
