import { Drawer } from "@mui/material";
import { Close, Delete } from "@mui/icons-material";
import { CalendarCheck } from "@mitch528/mdi-material-ui";
import { DayPicker } from "react-day-picker";

import {
  ButtonGroup,
  DrawerPicker,
  DrawerPaper,
  Picker,
  RightAlignedPicker,
  Title,
} from "./date-picker.styles";
import ActionButton from "../action-button/action-button";

const preventBubbling = (e) => e.stopPropagation();

const DatePicker = ({
  useDrawer = false,
  right = false,
  title,
  defaultDate,
  onChange,
  onCancel,
  onSave,
  onDelete,
  spring,
}) => {
  const picker = (
    <Picker
      sx={[useDrawer && DrawerPicker, right && RightAlignedPicker]}
      style={!useDrawer ? spring : undefined}
      onClick={preventBubbling}
    >
      <DayPicker
        defaultMonth={defaultDate}
        defaultSelected={defaultDate}
        disabled={{
          after: new Date(),
        }}
        mode="single"
        onSelect={onChange}
      />
      <ButtonGroup>
        <ActionButton
          Icon={Delete}
          onClick={onDelete}
          critical={true}
          fontSize={24}
        />
        <span />
        <ActionButton Icon={Close} onClick={onCancel} fontSize={24} />
        <ActionButton Icon={CalendarCheck} onClick={onSave} fontSize={24} />
      </ButtonGroup>
    </Picker>
  );

  return useDrawer ? (
    <Drawer
      anchor="bottom"
      open={true}
      ModalProps={{ hideBackdrop: true }}
      PaperProps={{ sx: [DrawerPaper] }}
    >
      <Title>{title}</Title>
      {picker}
    </Drawer>
  ) : (
    <>{picker}</>
  );
};

export default DatePicker;
