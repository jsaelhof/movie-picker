import { isNil } from "lodash";
import { styled } from "@mui/material";
import React from "react";

const Rated = ({ rated }) => {
  return (
    <RatedContainer>
      {rated === "N/A" || isNil(rated) ? "?" : rated}
    </RatedContainer>
  );
};

const RatedContainer = styled("div")`
  min-width: 10px;
  width: fit-content;
  height: 18px;
  border: 2px solid ${({ theme }) => theme.palette.grey[900]};
  border-radius: 4px;
  text-align: center;
  padding: 0 ${({ theme }) => theme.spacing(0.5)};
  color: ${({ theme }) => theme.palette.grey[900]};
`;

export default Rated;
