import "react-day-picker/style.css";

import { useRef } from "react";
import { DayPicker } from "react-day-picker";
import { Button, Drawer } from "@mui/material";

import { useOnClickOutside } from "../../hooks/use-on-click-outside";
import {
  ButtonGroup,
  DrawerPicker,
  Picker,
  RightAlignedPicker,
} from "./date-picker.styles";

const DatePicker = ({
  useDrawer = false,
  right = false,
  defaultDate,
  onChange,
  onCancel,
  onSave,
}) => {
  const ref = useRef();
  useOnClickOutside(ref, onCancel);

  const picker = (
    <Picker
      ref={ref}
      sx={[useDrawer && DrawerPicker, right && RightAlignedPicker]}
    >
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

  return useDrawer ? (
    <Drawer anchor="bottom" open={true} ModalProps={{ hideBackdrop: true }}>
      {picker}
    </Drawer>
  ) : (
    <>{picker}</>
  );
};

export default DatePicker;
