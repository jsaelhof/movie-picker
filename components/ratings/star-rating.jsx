import styles from "./star-rating.module.css";

import React from "react";
import clsx from "clsx";
import { isNil, times } from "lodash";
import { filter, flow, map, mean, round, thru } from "lodash/fp";

import { ratingsSource, ratingsSourceImage } from "../../constants/ratings";
import { omitTypename } from "../../utils/omit-typename";
import Star from "./star.svg";
import StarHalf from "./star-half.svg";
import StarOutline from "./star-outline.svg";

const toAverageRating = flow(
  filter((rating) => !isNil(rating)),
  map((rating) => parseInt(rating)),
  mean,
  thru((avg) => avg / 10),
  round,
  thru((avg) => avg / 2)
);

const StarRating = ({ ratings, className, ...props }) => {
  const avgRating = toAverageRating(omitTypename(ratings));

  return (
    <div className={clsx(styles.starRating, className)} {...props}>
      {times(5, (i) => {
        const offset = avgRating - i;
        if (offset >= 1) {
          return <Star />;
        } else if (offset === 0.5) {
          return <StarHalf />;
        } else {
          return <StarOutline />;
        }
      })}
    </div>
  );
};

export default StarRating;
