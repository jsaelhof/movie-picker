import React from "react";

import { LogoContainer } from "./logo.styles";

const Logo = ({ small }) => (
  <LogoContainer>
    <img src={small ? "/images/logo-small.png" : "/images/logo.png"} />
  </LogoContainer>
);

export default Logo;
