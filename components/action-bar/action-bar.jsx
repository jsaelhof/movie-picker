import React, { useState } from "react";
import { AppBar, Button, Toolbar } from "@material-ui/core";
import AddToQueueIcon from "@material-ui/icons/AddToQueue";
import clsx from "clsx";

import { useAppContext } from "../../context/app-context";
import { useResponsive } from "../../hooks/use-responsive";
import SplitButton from "../split-button/split-button";

import styles from "./action-bar.module.css";
import SortNav from "./sort-nav";

const ActionBar = ({ disabled, onAdd, onPick }) => {
  const { order, setOrder } = useAppContext();
  const { mobile, minimalColumns } = useResponsive();

  return (
    <div className={styles.appBar}>
      <AppBar position="static" color="transparent" elevation={0}>
        <Toolbar
          className={styles.toolbar}
          classes={{ root: clsx(mobile && styles.vertical) }}
        >
          <SortNav
            selectedOption={order}
            options={[
              ["Title", "title"],
              ["Runtime", "runtime"],
              ["Added", "addedOn"],
            ]}
            onSort={(option, direction) => {
              setOrder([option, direction]);
            }}
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
