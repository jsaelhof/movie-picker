import {
  Button,
  ButtonGroup,
  ClickAwayListener,
  MenuItem,
  MenuList,
  Paper,
  styled,
} from "@mui/material";
import React, { useState } from "react";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ClockIcon from "@mitch528/mdi-material-ui/ClockOutline";
import ClockFastIcon from "@mitch528/mdi-material-ui/ClockFast";
import TimerSandIcon from "@mitch528/mdi-material-ui/TimerSand";

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
    <SplitButtonContainer>
      <MainButton variant="contained" onClick={() => onPick()}>
        <RandomIcon src="/images/random.png" />
        Pick A Movie
      </MainButton>
      <Button
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

const SplitButtonContainer = styled(ButtonGroup)`
  position: relative;
`;

const MainButton = styled(Button)`
  width: 180px;

  @media (max-width: 500px) {
    width: unset;
    max-width: 180px;
  }
`;

const RandomIcon = styled("img")`
  width: 20px;
  margin-right: ${({ theme: { spacing } }) => spacing(2)};
  filter: invert(1);
`;

const SplitMenu = styled(Paper)`
  position: absolute;
  width: 220px;
  top: 38px;
  right: 0;
  box-shadow: 0px 5px 3px -2px rgba(0, 0, 0, 0.2),
    0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
  z-index: 5;
`;

const MenuIcon = styled("div")`
  margin-right: ${({ theme: { spacing } }) => spacing(1)};
`;

export default SplitButton;
