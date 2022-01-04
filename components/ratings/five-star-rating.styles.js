import { Popover, styled } from "@mui/material";

export const StarRatingContainer = styled("div")`
  display: grid;
  grid-template-columns: repeat(5, max-content);
  align-items: end;
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
  filter: drop-shadow(0px 2px 4px rgba(0, 0, 0, 0.5));
`;
