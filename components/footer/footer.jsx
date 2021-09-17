import styles from "./footer.module.css";

import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";

const Footer = () => {
  const router = useRouter;
  return (
    <div className={styles.footer}>
      <Link href="/">Movies</Link>
      <Link href="/watched">Watched</Link>
    </div>
  );
};

export default Footer;
