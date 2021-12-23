import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormHelperText,
  Input,
} from "@mui/material";
import React, { useState } from "react";
import { useAppContext } from "../../context/app-context";

const NewListDialog = ({ open, onCancel, onConfirm }) => {
  const [input, setInput] = useState("");
  const [error, setError] = useState(null);
  const { lists } = useAppContext();

  return (
    <Dialog open={open} onClose={onCancel} maxWidth="xs" fullWidth>
      <DialogTitle>If you build it, they will come</DialogTitle>

      <DialogContent>
        <Box sx={{ marginTop: 2, marginBottom: 4 }}>
          <DialogContentText>Enter a name for your new list:</DialogContentText>
          <Input
            fullWidth
            onChange={({ target }) => {
              setError(null);
              setInput(target.value);
            }}
            error={!!error}
          />
          <FormHelperText>{error ?? " "}</FormHelperText>
        </Box>

        <DialogActions>
          <Button
            onClick={() => {
              setError(null);
              setInput("");
              onCancel();
            }}
            autoFocus
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              if (input?.length === 0) {
                setError("Please enter a name for your list");
              } else if (lists?.map(({ label }) => label).includes(input)) {
                setError("There is already a list with this name");
              } else {
                setError(null);
                setInput("");
                onConfirm(input);
              }
            }}
            variant="contained"
            color="primary"
          >
            Create
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
};

export default NewListDialog;
