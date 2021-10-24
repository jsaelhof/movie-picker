import "react-day-picker/style.css";

import { useRef } from "react";
import { DayPicker } from "react-day-picker";
import { Button, Drawer, styled } from "@mui/material";

import { useOnClickOutside } from "../../hooks/use-on-click-outside";

const DatePicker = ({
  drawer = false,
  defaultDate,
  onChange,
  onCancel,
  onSave,
}) => {
  const ref = useRef();
  useOnClickOutside(ref, onCancel);

  const picker = (
    <Picker ref={ref} $drawer={drawer}>
      <DayPicker
        defaultMonth={defaultDate}
        defaultSelected={defaultDate}
        disabled={{
          after: new Date(),
        }}
        mode="single"
        onSelect={onChange}
        footer={
          <ButtonGroup>
            <Button variant="outlined" onClick={onCancel}>
              Cancel
            </Button>
            <Button variant="contained" color="primary" onClick={onSave}>
              Save
            </Button>
          </ButtonGroup>
        }
      />
    </Picker>
  );

  return drawer ? (
    <Drawer anchor="bottom" open={true} ModalProps={{ hideBackdrop: true }}>
      {picker}
    </Drawer>
  ) : (
    <>{picker}</>
  );
};

const Picker = styled("div")(({ $drawer }) => ({
  position: "absolute",
  background: "white",
  border: "1px solid rgba(0, 0, 0, 0.25)",
  top: 40,
  right: 20,
  zIndex: 10,
  boxShadow: "0 5px 10px rgba(0, 0, 0, 0.15)",
  borderRadius: 5,

  ...($drawer && {
    position: "initial",
    textAlign: "center",
  }),
}));

const ButtonGroup = styled("div")(({ theme: { spacing } }) => ({
  display: "flex",
  justifyContent: "space-between",
  marginLeft: "40%",
  marginTop: spacing(1),
}));

export default DatePicker;
