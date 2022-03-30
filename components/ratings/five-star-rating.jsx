import React from "react";
import { isNil, times } from "lodash";
import { filter, flow, map, mean, pick, round, thru } from "lodash/fp";

import { Star, StarRatingContainer } from "./five-star-rating.styles";
import StarFull from "./star.svg";
import StarHalf from "./star-half.svg";
import StarOutline from "./star-outline.svg";
import { ratingsSources } from "../../constants/ratings";

const toAverageRating = flow(
  pick(ratingsSources),
  filter((rating) => !isNil(rating)),
  map((rating) => parseInt(rating)),
  mean,
  thru((avg) => avg / 10),
  round,
  thru((avg) => avg / 2)
);

const heights = [16, 18, 20, 18, 16];
const margins = [0, 1, 1.5, 1, 0];

const FiveStarRating = ({ ratings }) => {
  const avgRating = toAverageRating(ratings);

  return (
    <StarRatingContainer>
      {times(5, (i) => {
        const offset = avgRating - i;
        const height = heights[i];
        const marginBottom = `${margins[i]}px`;
        if (offset >= 1) {
          return <Star as={StarFull} key={i} sx={{ height, marginBottom }} />;
        } else if (offset === 0.5) {
          return <Star as={StarHalf} key={i} sx={{ height, marginBottom }} />;
        } else {
          return (
            <Star as={StarOutline} key={i} sx={{ height, marginBottom }} />
          );
        }
      })}
    </StarRatingContainer>
  );
};

export default FiveStarRating;
