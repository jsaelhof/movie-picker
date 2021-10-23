import React from "react";
import { styled } from "@mui/material";

const Logo = ({ small }) => (
  <LogoContainer>
    <img src={small ? "/images/logo-small.png" : "/images/logo.png"} />
  </LogoContainer>
);

const LogoContainer = styled("div")(({ theme: { spacing } }) => ({
  gridArea: "logo",
  display: "grid",
  gridAutoFlow: "column",
  gap: spacing(1),
  alignItems: "center",
  justifyContent: "flex-start",
}));

export default Logo;
