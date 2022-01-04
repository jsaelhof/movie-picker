import React, { useState } from "react";
import { isNil, times } from "lodash";
import { filter, flow, map, mean, round, thru } from "lodash/fp";

import { omitTypename } from "../../utils/omit-typename";
import {
  Star,
  StarRatingContainer,
  StyledPopover,
  Tooltip,
} from "./five-star-rating.styles";
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

const heights = [16, 18, 20, 18, 16];
const margins = [0, 1, 1.5, 1, 0];

const FiveStarRating = ({ ratings, anchor }) => {
  // const [anchorEl, setAnchorEl] = useState(null);
  const avgRating = toAverageRating(omitTypename(ratings));

  return (
    <StarRatingContainer
    // onMouseEnter={(event) => setAnchorEl(event.currentTarget)}
    // onMouseLeave={() => {
    //   setAnchorEl(null);
    // }}
    >
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

      {/* <StyledPopover
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
      </StyledPopover> */}
    </StarRatingContainer>
  );
};

export default FiveStarRating;
