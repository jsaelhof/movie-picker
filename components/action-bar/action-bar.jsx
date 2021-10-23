import React from "react";
import { AppBar, Button, styled, Toolbar } from "@mui/material";
import AddToQueue from "@mui/icons-material/AddToQueue";

import { useAppContext } from "../../context/app-context";
import { useResponsive } from "../../hooks/use-responsive";
import SortNav from "./sort-nav";
import SplitButton from "../split-button/split-button";

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
                ["Title", "title"],
                ["Runtime", "runtime"],
                ["Added", "addedOn"],
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

const ActionBarContainer = styled("div")(
  ({ theme: { breakpoints, spacing } }) => ({
    flexGrow: 1,

    [breakpoints.down(615)]: {
      marginTop: spacing(3),
    },
  })
);

const ActionToolbar = styled(Toolbar)(
  ({ theme: { breakpoints, spacing } }) => ({
    marginTop: spacing(2),
    columnGap: spacing(2),
    padding: 0,

    [breakpoints.down(615)]: {
      flexDirection: "column-reverse",
      height: 100,
      marginBottom: spacing(2),
    },
  })
);

const SecondaryActions = styled("div")(({ theme: { spacing } }) => ({
  display: "grid",
  gridAutoFlow: "column",
  columnGap: spacing(2),
}));

const AddToQueueIcon = styled(AddToQueue)(
  ({ theme: { breakpoints, spacing } }) => ({
    marginRight: spacing(2),

    [breakpoints.down(736)]: {
      marginRight: 0,
    },
  })
);

export default ActionBar;
