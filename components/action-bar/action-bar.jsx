import React from "react";
import { AppBar, Button, Toolbar } from "@material-ui/core";
import AddToQueueIcon from "@material-ui/icons/AddToQueue";
import clsx from "clsx";

import { useResponsive } from "../../hooks/use-responsive";
import DbSelect from "../db-select/db-select";
import SplitButton from "../split-button/split-button";

import styles from "./action-bar.module.css";

const ActionBar = ({
  disabled,
  lists,
  currentList,
  onListChange,
  onAdd,
  onPick,
}) => {
  const { mobile, minimalColumns } = useResponsive();

  return (
    <div className={styles.appBar}>
      <AppBar position="static" color="transparent" elevation={0}>
        <Toolbar
          className={styles.toolbar}
          classes={{ root: clsx(mobile && styles.vertical) }}
        >
          {/* TODO: Rename this component to CollectionSelect */}
          <DbSelect
            dbs={lists}
            currentDb={currentList}
            onDBChange={(lists, currentList, onListChange)}
          />
          <div className={styles.secondaryActions}>
            {!disabled && (
              <Button variant="outlined" onClick={onAdd}>
                <AddToQueueIcon
                  className={clsx(
                    styles.addToQueue,
                    minimalColumns && styles.addToQueueIconOnly
                  )}
                />
                {!minimalColumns && "Add Movie"}
              </Button>
            )}
            {!disabled && <SplitButton onPick={onPick} />}
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default ActionBar;
