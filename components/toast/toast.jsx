import {Button, IconButton, Snackbar} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import React from "react";

const Toast = ({open, onClose, duration = 3000, message}) => {
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
          {/* <Button color="secondary" size="small" onClick={handleClose}>
              UNDO
            </Button> */}
          <IconButton size="small" color="inherit" onClick={onClose}>
            <CloseIcon fontSize="small" />
          </IconButton>
        </React.Fragment>
      }
    />
  );
};

export default Toast;
