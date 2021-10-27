import React, { useState } from "react";
import { isNil, times } from "lodash";
import { filter, flow, map, mean, round, thru } from "lodash/fp";
import { Popover, styled } from "@mui/material";

import { omitTypename } from "../../utils/omit-typename";
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

const StarRatingContainer = styled("div")`
  display: grid;
  grid-auto-flow: column;
  column-gap: 2px;
  align-items: center;
  width: 100px;
`;

const StyledPopover = styled(Popover)`
  pointer-events: none;
  margin-top: ${({ theme: { spacing } }) => spacing(1)};

  & .MuiPopover-paper {
    border-radius: 8px;
  }
`;

const Tooltip = styled("div")`
  padding: 0 ${({ theme: { spacing } }) => spacing(2)};
`;

const Star = styled("svg")`
  height: 18.5px;
  filter: drop-shadow(0px 0px 1px rgba(0, 0, 0, 0.5));
`;

export default StarRating;
