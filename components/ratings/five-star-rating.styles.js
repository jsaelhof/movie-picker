import { styled } from "@mui/material";

export const StarRatingContainer = styled("div")`
  display: grid;
  grid-template-columns: repeat(5, max-content);
  align-items: end;
`;

export const Star = styled("div")`
  font-size: 0;
  width: 100%;

  > img {
    width: 100%;
    height: 100%;
  }
`;
