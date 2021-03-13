import {AppBar, Button, Toolbar} from "@material-ui/core";
import AddToQueueIcon from "@material-ui/icons/AddToQueue";

import DbSelect from "../db-select/db-select";
import SplitButton from "../split-button/split-button";

import styles from "./action-bar.module.css";

const TitleBar = ({
  dbs,
  currentDb,
  onDBChange,
  onAdd,
  onPick,
  onOpenPickMenu,
  onClosePickMenu,
}) => {
  return (
    <div className={styles.appBar}>
      <AppBar position="static" color="transparent" elevation={0}>
        <Toolbar className={styles.toolbar}>
          <DbSelect
            dbs={dbs}
            currentDb={currentDb}
            onDBChange={(dbs, currentDb, onDBChange)}
          />

          <Button variant="outlined" onClick={onAdd}>
            <AddToQueueIcon className={styles.addToQueue} />
            Add Movie
          </Button>

          <SplitButton
            onPick={onPick}
            onOpen={onOpenPickMenu}
            onClose={onClosePickMenu}
          />
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default TitleBar;
