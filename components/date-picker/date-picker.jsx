import { useRef } from "react";
import { DayPicker } from "react-day-picker";
import Button from "@material-ui/core/Button";

import { useOnClickOutside } from "../../hooks/use-on-click-outside";

import styles from "./date-picker.module.css";
import "react-day-picker/style.css";

const DatePicker = ({ defaultDate, onChange, onCancel, onSave }) => {
  const ref = useRef();
  useOnClickOutside(ref, onCancel);

  return (
    <div ref={ref} className={styles.datePicker}>
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
};

export default DatePicker;
