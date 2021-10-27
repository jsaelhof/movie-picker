import React from "react";
import has from "lodash/has";
import map from "lodash/map";
import { styled } from "@mui/material";

import { ratingsSource, ratingsSourceImage } from "../../constants/ratings";

const Ratings = ({ ratings, size = "medium", dense }) => (
  <RatingsList $dense={dense}>
    {map(ratings, (rating, source) =>
      has(ratingsSource, source) && rating ? (
        <RatingsListItem key={source}>
          <RatingsSourceIcon
            $size={size}
            src={`/images/ratings/${ratingsSourceImage[source]}`}
          />
          {rating}
        </RatingsListItem>
      ) : null
    )}
  </RatingsList>
);

const RatingsList = styled("ul")`
  display: flex;
  list-style-type: none;
  padding-left: 0;
  align-self: center;

  ${({ $dense }) => $dense && { margin: 0 }}
`;

const RatingsListItem = styled("li")`
  display: flex;
  align-items: center;
  margin-right: 20px;

  &:last-child {
    margin-right: 0;
  }
`;

const RatingsSourceIcon = styled("img")(({ $size }) =>
  $size === "small"
    ? {
        width: 20,
        height: 20,
        marginRight: 8,
      }
    : {
        width: 24,
        height: 24,
        marginRight: 8,
      }
);

export default Ratings;
