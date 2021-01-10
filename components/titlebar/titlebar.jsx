import {AppBar, Button, Toolbar} from "@material-ui/core";
import Movie from "@material-ui/icons/Movie";

import styles from "./titlebar.module.css";

const TitleBar = ({add, pick}) => (
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

        <Button variant="contained" color="primary" onClick={() => pick()}>
          <img src="/images/random.png" className={styles.random} />
          Pick A Movie
        </Button>
      </Toolbar>
    </AppBar>
  </div>
);

export default TitleBar;
