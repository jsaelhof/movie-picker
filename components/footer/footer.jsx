import React from "react";
import Link from "next/link";
import { styled } from "@mui/material";

const Footer = () => {
  return (
    <FooterContainer>
      <Link href="/">Movies</Link>
      <Link href="/watched">Watched</Link>
    </FooterContainer>
  );
};

const FooterContainer = styled("div")`
  width: 100%;
  height: ${({ theme: { spacing } }) => spacing(8)};
  display: flex;
  justify-content: center;
  align-items: center;

  & > a {
    font-size: 0.9rem;
    margin: ${({ theme: { spacing } }) => spacing(0, 2)};
    text-decoration: none;
    color: ${({ theme: { palette } }) => palette.grey[600]};
  }

  & > a:hover {
    color: ${({ theme: { palette } }) => palette.accent};
  }
`;

export default Footer;
