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

const FooterContainer = styled("div")(({ theme: { palette, spacing } }) => ({
  width: "100%",
  height: spacing(8),
  display: "flex",
  justifyContent: "center",
  alignItems: "center",

  "& > a": {
    fontSize: "0.9rem",
    margin: `0 ${spacing(2)}`,
    textDecoration: "none",
    color: palette.grey[600],
  },

  "& > a:hover": {
    color: palette.accent,
  },
}));

export default Footer;
