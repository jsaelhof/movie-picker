import React from "react";
import has from "lodash/has";
import map from "lodash/map";

import { ratingsSource, ratingsSourceImage } from "../../constants/ratings";
import {
  denseMargins,
  RatingsList,
  RatingsListItem,
  ratingsSmall,
  RatingsSourceIcon,
} from "./ratings.styles";

const Ratings = ({ ratings, size = "medium", dense }) => (
  <RatingsList sx={[dense && denseMargins]}>
    {map(ratings, (rating, source) =>
      has(ratingsSource, source) && rating ? (
        <RatingsListItem key={source}>
          <RatingsSourceIcon
            sx={[size === "small" && ratingsSmall]}
            src={`/images/ratings/${ratingsSourceImage[source]}`}
          />
          {rating}
        </RatingsListItem>
      ) : null
    )}
  </RatingsList>
);

export default Ratings;
