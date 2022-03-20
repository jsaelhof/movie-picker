import { styled, TextField } from "@mui/material";

export const Container = styled("div")(() => ({
  display: "grid",
  justifyItems: "center",
}));

export const ListInput = styled(TextField)(() => ({
  width: 300,

  "& .MuiInput-input": {
    textAlign: "center",
  },

  "& .MuiInputLabel-root": {
    left: 0,
    right: 0,
    transformOrigin: "center",
    textAlign: "center",
  },
}));
