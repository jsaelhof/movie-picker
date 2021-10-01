import styles from "./star-rating.module.css";

import React, { useState } from "react";
import clsx from "clsx";
import { isNil, times } from "lodash";
import { filter, flow, map, mean, round, thru } from "lodash/fp";
import { Popover } from "@material-ui/core";

import { omitTypename } from "../../utils/omit-typename";
import Star from "./star.svg";
import StarHalf from "./star-half.svg";
import StarOutline from "./star-outline.svg";
import Ratings from "./ratings";

const toAverageRating = flow(
  filter((rating) => !isNil(rating)),
  map((rating) => parseInt(rating)),
  mean,
  thru((avg) => avg / 10),
  round,
  thru((avg) => avg / 2)
);

const StarRating = ({ ratings, anchor, className }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const avgRating = toAverageRating(omitTypename(ratings));

  return (
    <div
      className={clsx(styles.starRating, className)}
      onMouseEnter={(event) => setAnchorEl(event.currentTarget)}
      onMouseLeave={() => {
        setAnchorEl(null);
      }}
    >
      {times(5, (i) => {
        const offset = avgRating - i;
        if (offset >= 1) {
          return <Star key={i} />;
        } else if (offset === 0.5) {
          return <StarHalf key={i} />;
        } else {
          return <StarOutline key={i} />;
        }
      })}

      <Popover
        className={styles.popover}
        open={!!anchorEl}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: anchor,
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: anchor,
        }}
        onClose={() => setAnchorEl(null)}
        disableRestoreFocus
        elevation={4}
        classes={{
          paper: styles.paper,
        }}
      >
        <div className={styles.tooltip}>
          <Ratings ratings={ratings} />
        </div>
      </Popover>
    </div>
  );
};

export default StarRating;
