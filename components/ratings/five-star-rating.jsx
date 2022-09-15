import React from "react";
import { isNil, times } from "lodash";
import { filter, flow, map, mean, pick } from "lodash/fp";

import { Star, StarRatingContainer } from "./five-star-rating.styles";
import { ratingsSources } from "../../constants/ratings";

const toAverageRating = flow(
  pick(ratingsSources),
  filter((rating) => !isNil(rating)),
  map((rating) => parseInt(rating)),
  mean,
  (val) => Math.round(val / 10) / 2
);

const heights = [16, 18, 20, 18, 16];
const margins = [0, 1, 1.5, 1, 0];

const FiveStarRating = ({ ratings }) => {
  const avgRating = toAverageRating(ratings);
  return (
    <StarRatingContainer>
      {times(5, (i) => (
        <Star
          key={i}
          sx={{
            height: heights[i],
            marginBottom: `${margins[i]}px`,
          }}
        >
          {[
            avgRating - i >= 1
              ? "star-full"
              : avgRating - i === 0.5
              ? "star-half"
              : "star-outline",
          ].map((image) => (
            <img key={i} src={`/images/star/${image}.svg`} alt={image} />
          ))}
        </Star>
      ))}
    </StarRatingContainer>
  );
};

export default FiveStarRating;
