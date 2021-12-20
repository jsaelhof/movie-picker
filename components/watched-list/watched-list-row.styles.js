import { styled } from "@mui/material";

import ListCell from "./list-cell";

export const RelativeListCell = styled(ListCell)`
  position: relative;
`;

export const Title = styled("a")`
  text-decoration: none;
  color: initial;

  @media (max-width: 736px) {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
`;
