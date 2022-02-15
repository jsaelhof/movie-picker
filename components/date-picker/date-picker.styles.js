import { styled } from "@mui/material";

export const Picker = styled("div")(() => ({
  position: "absolute",
  background: "white",
  border: "1px solid rgba(0, 0, 0, 0.25)",
  top: 40,
  left: -20,
  zIndex: 10000,
  boxShadow: "0 5px 10px rgba(0, 0, 0, 0.15)",
  borderRadius: 5,
}));

export const RightAlignedPicker = {
  left: "unset",
  right: -20,
};

export const DrawerPicker = {
  position: "initial",
  textAlign: "center",
};

export const ButtonGroup = styled("div")(({ theme: { spacing } }) => ({
  display: "flex",
  justifyContent: "space-between",
  marginLeft: "40%",
  marginTop: spacing(1),
}));
