import React from "react";

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
    {Object.entries(ratings).map(([source, rating]) =>
      ratingsSource[source] && rating ? (
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

export default React.memo(Ratings);
