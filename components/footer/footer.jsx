import React from "react";
import Link from "next/link";
import { FooterLayout } from "./footer.styles";

const Footer = () => {
  return (
    <FooterLayout>
      <Link href="/">Movies</Link>
      <Link href="/watched">Watched</Link>
    </FooterLayout>
  );
};

export default Footer;
