import styles from "./nav-full.module.css";

import { useRouter } from "next/router";
import React from "react";
import Link from "next/link";

import DbSelect from "./db-select";

const NavFull = () => {
  const router = useRouter();

  return (
    <div className={styles.nav}>
      {router.pathname !== "/" && <Link href="/">Movies</Link>}
      {router.pathname !== "/watched" && <Link href="/watched">Watched</Link>}

      <DbSelect />
    </div>
  );
};

export default NavFull;
