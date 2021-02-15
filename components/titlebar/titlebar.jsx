import {
  AppBar,
  Button,
  ButtonGroup,
  ClickAwayListener,
  MenuItem,
  MenuList,
  Paper,
  Select,
  Toolbar,
} from "@material-ui/core";
import Movie from "@material-ui/icons/Movie";

import styles from "./titlebar.module.css";

const TitleBar = () => {
  return (
    <div className={styles.appBar}>
      <AppBar position="static" color="primary" elevation={2}>
        <Toolbar className={styles.toolbar}>
          <Movie />
          <div className={styles.title}>Movie Decider 4000</div>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default TitleBar;
