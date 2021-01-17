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
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import Movie from "@material-ui/icons/Movie";
import {useState} from "react";

import styles from "./titlebar.module.css";

const splitButtonItems = [
  {
    value: 0,
    label: "Pick a Short Movie",
    options: {minRuntime: 0, maxRuntime: 5700},
  },
  {
    value: 1,
    label: "Pick a Regular Movie",
    options: {minRuntime: 5701, maxRuntime: 7800},
  },
  {
    value: 2,
    label: "Pick a Long Movie",
    options: {minRuntime: 7801, maxRuntime: 36000},
  },
];

const TitleBar = ({add, pick}) => {
  const [openSplitButton, setOpenSplitButton] = useState(false);

  return (
    <div className={styles.appBar}>
      <AppBar position="static" color="transparent" elevation={0}>
        <Toolbar className={styles.toolbar}>
          <Movie />
          <div className={styles.title}>Movie Decider 4000</div>
          <Button
            variant="outlined"
            onClick={() =>
              add({
                title,
                runtime,
                genre,
                source,
              })
            }
          >
            Add Movie
          </Button>

          <ButtonGroup style={{position: "relative"}}>
            <Button variant="contained" color="primary" onClick={() => pick()}>
              <img src="/images/random.png" className={styles.random} />
              Pick A Movie
            </Button>
            <Button
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
                    {splitButtonItems.map(({value, label, options}) => (
                      <MenuItem
                        key={value}
                        onClick={() => pick(options)}
                        className={styles.splitButtonMenuItem}
                      >
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
