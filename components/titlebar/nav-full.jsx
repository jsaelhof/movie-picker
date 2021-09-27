import styles from "./nav-full.module.css";

import { useRouter } from "next/router";
import React from "react";
import DbSelect from "./db-select";
import { KeyboardArrowLeft, Refresh } from "@material-ui/icons";

import NavButton from "./nav-button";

const NavFull = () => {
  const { pathname } = useRouter();

  return (
    <div className={styles.nav}>
      {pathname === "/pick" && (
        <>
          <NavButton startIcon={<KeyboardArrowLeft />} href="/">
            Return to Movies
          </NavButton>

          <NavButton startIcon={<Refresh />} refresh>
            Pick Again
          </NavButton>
        </>
      )}

      {pathname !== "/pick" && (
        <>
          <NavButton href="/">Movies</NavButton>

          <NavButton href="/watched">Watched</NavButton>

          <DbSelect />
        </>
      )}
    </div>
  );
};

export default NavFull;
