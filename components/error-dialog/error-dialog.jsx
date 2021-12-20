import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import React from "react";

const ErrorDialog = ({open, content, onConfirm}) => (
  <Dialog open={open} onClose={onConfirm} maxWidth="xs" fullWidth>
    <DialogTitle>{"Houston, we have a problem."}</DialogTitle>
    <DialogContent>
      <DialogContentText>{content}</DialogContentText>
      <DialogActions>
        <Button onClick={onConfirm} color="primary" variant="contained">
          Ok
        </Button>
      </DialogActions>
    </DialogContent>
  </Dialog>
);

export default ErrorDialog;
