import styles from "./ratings.module.css";

import React from "react";
import clsx from "clsx";
import has from "lodash/has";
import map from "lodash/map";

import { ratingsSource, ratingsSourceImage } from "../../constants/ratings";

export const Ratings = ({
  ratings,
  size = "medium",
  dense,
  className,
  ...props
}) => (
  <ul
    {...props}
    className={clsx(styles.ratings, dense && styles.dense, className)}
  >
    {map(ratings, (rating, source) =>
      has(ratingsSource, source) && rating ? (
        <li key={source}>
          <img
            src={`/images/ratings/${ratingsSourceImage[source]}`}
            className={clsx(
              size === "medium" && styles.ratingsSourceIconMedium,
              size === "small" && styles.ratingsSourceIconSmall
            )}
          />
          {rating}
        </li>
      ) : null
    )}
  </ul>
);
