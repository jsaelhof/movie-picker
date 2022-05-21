import { Button, ClickAwayListener, MenuItem, MenuList } from "@mui/material";
import React, { useState } from "react";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ClockIcon from "@mitch528/mdi-material-ui/ClockOutline";
import ClockFastIcon from "@mitch528/mdi-material-ui/ClockFast";
import TimerSandIcon from "@mitch528/mdi-material-ui/TimerSand";

import {
  MainButton,
  MenuIcon,
  RandomIcon,
  SplitButtonContainer,
  SplitMenu,
} from "./split-button.styles";

const splitButtonItems = [
  {
    value: 0,
    label: "Pick a Short Movie",
    options: { maxRuntime: 6000 },
    Icon: ClockFastIcon,
  },
  {
    value: 1,
    label: "Pick a Regular Movie",
    options: { minRuntime: 6001, maxRuntime: 7800 },
    Icon: ClockIcon,
  },
  {
    value: 2,
    label: "Pick a Long Movie",
    options: { minRuntime: 7801 },
    Icon: TimerSandIcon,
  },
];

const SplitButton = ({ onPick }) => {
  const [openSplitButton, setOpenSplitButton] = useState(false);

  return (
    <SplitButtonContainer aria-label="Pick A Movie">
      <MainButton variant="contained" onClick={() => onPick()}>
        <RandomIcon src="/images/random.png" />
        Pick A Movie
      </MainButton>
      <Button
        aria-label="Pick Menu"
        variant="contained"
        size="small"
        onClick={() => setOpenSplitButton(true)}
      >
        <ArrowDropDownIcon />
      </Button>

      {openSplitButton && (
        <SplitMenu>
          <ClickAwayListener onClickAway={() => setOpenSplitButton(false)}>
            <MenuList id="split-button-menu">
              {splitButtonItems.map(({ value, label, Icon, options }) => (
                <MenuItem key={value} onClick={() => onPick(options)}>
                  {<MenuIcon as={Icon} />}
                  {label}
                </MenuItem>
              ))}
            </MenuList>
          </ClickAwayListener>
        </SplitMenu>
      )}
    </SplitButtonContainer>
  );
};

export default SplitButton;
