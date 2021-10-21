import { useRef } from "react";
import { DayPicker } from "react-day-picker";
import { Button, Drawer } from "@mui/material";
import clsx from "clsx";

import { useOnClickOutside } from "../../hooks/use-on-click-outside";

import styles from "./date-picker.module.css";
import "react-day-picker/style.css";

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
    <div
      ref={ref}
      className={clsx(styles.datePicker, drawer && styles.datePickerDrawer)}
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
          <div className={styles.buttons}>
            <Button variant="outlined" onClick={onCancel}>
              Cancel
            </Button>
            <Button variant="contained" color="primary" onClick={onSave}>
              Save
            </Button>
          </div>
        }
      />
    </div>
  );

  return drawer ? (
    <Drawer anchor="bottom" open={true} ModalProps={{ hideBackdrop: true }}>
      {picker}
    </Drawer>
  ) : (
    <>{picker}</>
  );
};

export default DatePicker;
