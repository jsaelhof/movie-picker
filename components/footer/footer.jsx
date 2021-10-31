import styles from "./footer.module.css";

import React from "react";
import Link from "next/link";

const Footer = () => (
  <div className={styles.footer}>
    <Link href="/">Movies</Link>
    <Link href="/watched">Watched</Link>
  </div>
);

export default Footer;
