import React from "react";
import { AppBar, Button, Toolbar } from "@material-ui/core";
import AddToQueueIcon from "@material-ui/icons/AddToQueue";
import clsx from "clsx";

import { useAppContext } from "../../context/app-context";
import { useResponsive } from "../../hooks/use-responsive";
import SortNav from "./sort-nav";
import SplitButton from "../split-button/split-button";

import styles from "./action-bar.module.css";

const ActionBar = ({ disabled, onAdd, onPick }) => {
  const { order, setOrder } = useAppContext();
  const { small, minimalColumns } = useResponsive();

  return (
    <div className={clsx(styles.appBar, small && styles.verticalAppBar)}>
      <AppBar position="static" color="transparent" elevation={0}>
        {!disabled && (
          <Toolbar
            className={styles.toolbar}
            classes={{ root: clsx(small && styles.verticalActions) }}
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
              <Button variant="outlined" color="primary" onClick={onAdd}>
                <AddToQueueIcon
                  className={clsx(
                    styles.addToQueue,
                    minimalColumns && styles.addToQueueIconOnly
                  )}
                />
                {!minimalColumns && "Add Movie"}
              </Button>
              <SplitButton onPick={onPick} />
            </div>
          </Toolbar>
        )}
      </AppBar>
    </div>
  );
};

export default ActionBar;
