import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";
import React from "react";

const DeleteDialog = ({open, title, content, onCancel, onConfirm}) => (
  <Dialog open={open} onClose={onCancel} maxWidth="xs" fullWidth>
    <DialogTitle>{title}</DialogTitle>
    <DialogContent>
      <DialogContentText>{content}</DialogContentText>
      <DialogActions>
        <Button onClick={onCancel} autoFocus>
          Cancel
        </Button>
        <Button onClick={onConfirm} color="secondary" variant="contained">
          Delete
        </Button>
      </DialogActions>
    </DialogContent>
  </Dialog>
);

export default DeleteDialog;
