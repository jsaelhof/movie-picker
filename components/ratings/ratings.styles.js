import { styled } from "@mui/material";

export const RatingsList = styled("ul")`
  display: flex;
  list-style-type: none;
  padding-left: 0;
`;

export const denseMargins = {
  margin: 0,
};

export const RatingsListItem = styled("li")`
  display: flex;
  align-items: center;
  margin-right: 20px;

  &:last-child {
    margin-right: 0;
  }
`;

export const RatingsSourceIcon = styled("img")(() => ({
  width: 24,
  height: 24,
  marginRight: 8,
}));

export const ratingsSmall = {
  width: 20,
  height: 20,
};
