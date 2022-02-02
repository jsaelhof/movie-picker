import { isNil } from "lodash";
import { styled } from "@mui/material";
import React from "react";

import { RatedContainer } from "./rated.styles";

const Rated = ({ rated }) => {
  return (
    <RatedContainer>
      {rated === "N/A" || isNil(rated) ? "?" : rated}
    </RatedContainer>
  );
};

export default Rated;
