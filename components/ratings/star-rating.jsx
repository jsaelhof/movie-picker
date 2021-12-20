import React, { useState } from "react";
import { isNil, times } from "lodash";
import { filter, flow, map, mean, round, thru } from "lodash/fp";

import { omitTypename } from "../../utils/omit-typename";
import {
  Star,
  StarRatingContainer,
  StyledPopover,
  Tooltip,
} from "./star-rating.styles";
import StarFull from "./star.svg";
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

const StarRating = ({ ratings, anchor }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const avgRating = toAverageRating(omitTypename(ratings));

  return (
    <StarRatingContainer
      onMouseEnter={(event) => setAnchorEl(event.currentTarget)}
      onMouseLeave={() => {
        setAnchorEl(null);
      }}
    >
      {times(5, (i) => {
        const offset = avgRating - i;
        if (offset >= 1) {
          return <Star as={StarFull} key={i} />;
        } else if (offset === 0.5) {
          return <Star as={StarHalf} key={i} />;
        } else {
          return <Star as={StarOutline} key={i} />;
        }
      })}

      <StyledPopover
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
      >
        <Tooltip>
          <Ratings ratings={ratings} />
        </Tooltip>
      </StyledPopover>
    </StarRatingContainer>
  );
};

export default StarRating;
