import { DayPicker } from "react-day-picker";

import styles from "./date-picker.module.css";
import "react-day-picker/style.css";

const DatePicker = ({ defaultDate, onChange, onCancel, onSave }) => {
  return (
    <div className={styles.datePicker}>
      <DayPicker
        defaultMonth={defaultDate}
        defaultSelected={defaultDate}
        disabled={{
          after: new Date(),
        }}
        mode="single"
        onSelect={onChange}
        footer={
          <div>
            <input type="button" value="Cancel" onClick={onCancel} />
            <input type="button" value="Save" onClick={onSave} />
          </div>
        }
      />
    </div>
  );
};

export default DatePicker;
