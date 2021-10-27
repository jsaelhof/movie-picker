import React from "react";
import { styled } from "@mui/material";

const PageContainer = ({ children }) => <Container>{children}</Container>;

const Container = styled("div")`
  padding: 0 44px;

  @media (max-width: 500px) {
    padding: 0 16px;
  }
`;

export default PageContainer;
