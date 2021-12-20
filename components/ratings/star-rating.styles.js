import { Popover, styled } from "@mui/material";

export const StarRatingContainer = styled("div")`
  display: grid;
  grid-auto-flow: column;
  column-gap: 2px;
  align-items: center;
  width: 100px;
`;

export const StyledPopover = styled(Popover)`
  pointer-events: none;
  margin-top: ${({ theme: { spacing } }) => spacing(1)};

  & .MuiPopover-paper {
    border-radius: 8px;
  }
`;

export const Tooltip = styled("div")`
  padding: 0 ${({ theme: { spacing } }) => spacing(2)};
`;

export const Star = styled("svg")`
  height: 18.5px;
  filter: drop-shadow(0px 0px 1px rgba(0, 0, 0, 0.5));
`;
