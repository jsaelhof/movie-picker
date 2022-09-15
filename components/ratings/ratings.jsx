import React from "react";

import { ratingsSource, ratingsSourceImage } from "../../constants/ratings";
import {
  denseMargins,
  RatingsList,
  small,
  RatingsListItem,
  ratingsSourceIconSmall,
  RatingsSourceIcon,
} from "./ratings.styles";

const Ratings = ({ ratings, size = "medium", dense }) => {
  if (!ratings) return null;

  return (
    <RatingsList sx={[dense && denseMargins, size === "small" && small]}>
      {Object.entries(ratings).map(([source, rating]) =>
        ratingsSource[source] && rating ? (
          <RatingsListItem key={source}>
            <RatingsSourceIcon
              sx={[size === "small" && ratingsSourceIconSmall]}
              src={`/images/ratings/${ratingsSourceImage[source]}`}
              alt={source}
            />
            {rating}
          </RatingsListItem>
        ) : null
      )}
    </RatingsList>
  );
};

export default React.memo(Ratings);
