import { Button, ButtonGroup, Paper, styled } from "@mui/material";

export const SplitButtonContainer = styled(ButtonGroup)`
  position: relative;
`;

export const MainButton = styled(Button)`
  width: 180px;

  @media (max-width: 500px) {
    width: unset;
    max-width: 180px;
  }
`;

export const RandomIcon = styled("img")`
  width: 20px;
  margin-right: ${({ theme: { spacing } }) => spacing(2)};
  filter: invert(1);
`;

export const SplitMenu = styled(Paper)`
  position: absolute;
  width: 220px;
  top: 38px;
  right: 0;
  box-shadow: 0px 5px 3px -2px rgba(0, 0, 0, 0.2),
    0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
  z-index: 5;
`;

export const MenuIcon = styled("div")`
  margin-right: ${({ theme: { spacing } }) => spacing(1)};
`;
