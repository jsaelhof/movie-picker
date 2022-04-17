import React from "react";
import { AppBar, Button } from "@mui/material";

import { useAppContext } from "../../context/app-context";
import { useResponsive } from "../../hooks/use-responsive";
import SortNav from "./sort-nav";
import SplitButton from "../split-button/split-button";
import {
  ActionBarContainer,
  ActionToolbar,
  AddToQueueIcon,
  SecondaryActions,
} from "./action-bar.styles";

const ActionBar = ({ disabled, onAdd, onPick }) => {
  const { order, setOrder } = useAppContext();
  const { minimalColumns } = useResponsive();

  return (
    <ActionBarContainer>
      <AppBar position="static" color="transparent" elevation={0}>
        {!disabled && (
          <ActionToolbar>
            <SortNav
              selectedOption={order}
              options={[
                ["Added", "addedOn"],
                ["Title", "title"],
                ["Runtime", "runtime"],
              ]}
              onSort={(option, direction) => {
                setOrder([option, direction]);
              }}
            />

            <SecondaryActions>
              <Button variant="outlined" color="primary" onClick={onAdd}>
                <AddToQueueIcon />
                {!minimalColumns && "Add Movie"}
              </Button>
              <SplitButton onPick={onPick} />
            </SecondaryActions>
          </ActionToolbar>
        )}
      </AppBar>
    </ActionBarContainer>
  );
};

export default ActionBar;
