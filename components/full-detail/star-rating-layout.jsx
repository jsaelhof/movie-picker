import { useState } from "react";
import { animated, useSpring } from "react-spring";
import { debounce } from "lodash";
import { useMediaQuery } from "@mui/material";

import Ratings from "../ratings/ratings";
import FiveStarRating from "../ratings/five-star-rating";
import { RatingContainer } from "./star-rating-layout.styles";

export const StarRatingLayout = ({ ratings }) => {
  console.log({ ratings });
  const centered = useMediaQuery("(max-width: 660px)");
  const [showRatings, setShowRatings] = useState(false);

  const displayRatings = debounce(() => setShowRatings(true), 500);
  const ratingsSpring = useSpring({
    opacity: showRatings ? 1 : -0.25,
    ...(centered && { marginTop: showRatings ? 16 : -16, marginLeft: 0 }),
    ...(!centered && { marginLeft: showRatings ? 0 : -32, marginTop: 0 }),
  });

  return (
    <RatingContainer
      onMouseEnter={displayRatings}
      onMouseLeave={() => {
        displayRatings.cancel();
        setShowRatings(false);
      }}
      onClick={() => {
        // OnClick, toggle the state.
        // Works for desktop and mobile but mainly here for mobile.
        setShowRatings(!showRatings);
      }}
    >
      <FiveStarRating ratings={ratings} />
      <animated.div style={ratingsSpring}>
        <Ratings ratings={ratings} size="small" dense />
      </animated.div>
    </RatingContainer>
  );
};
