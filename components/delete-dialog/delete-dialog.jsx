import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import React from "react";

const DeleteDialog = ({ open, content, onCancel, onConfirm }) => (
  <Dialog open={open} onClose={onCancel} maxWidth="xs" fullWidth>
    <DialogTitle>Hasta La Vista, Baby</DialogTitle>
    <DialogContent>
      <DialogContentText>{content}</DialogContentText>
      <DialogActions>
        <Button onClick={onCancel} autoFocus>
          Cancel
        </Button>
        <Button onClick={onConfirm} variant="contained" color="error">
          Delete
        </Button>
      </DialogActions>
    </DialogContent>
  </Dialog>
);

export default DeleteDialog;
