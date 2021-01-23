import {Button, IconButton, Snackbar} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import React from "react";

const Toast = ({open, onClose, onUndo, duration = 5000, message}) => {
  return (
    <Snackbar
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      open={open}
      autoHideDuration={duration}
      onClose={onClose}
      message={message}
      action={
        <React.Fragment>
          {onUndo && (
            <Button color="secondary" size="small" onClick={onUndo}>
              UNDO
            </Button>
          )}
          <IconButton size="small" color="inherit" onClick={onClose}>
            <CloseIcon fontSize="small" />
          </IconButton>
        </React.Fragment>
      }
    />
  );
};

export default Toast;
