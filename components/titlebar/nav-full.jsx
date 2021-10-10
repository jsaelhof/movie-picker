import styles from "./nav-full.module.css";

import { useRouter } from "next/router";
import React from "react";
import clsx from "clsx";
import { KeyboardArrowLeft, Refresh } from "@material-ui/icons";
import { useMediaQuery } from "@material-ui/core";

import { useAppContext } from "../../context/app-context";
import DbSelect from "./db-select";
import NavButton from "./nav-button";

const NavFull = () => {
  const { pathname } = useRouter();
  const { setPick } = useAppContext();
  const small = useMediaQuery("(max-width: 640px)");

  return (
    <div className={clsx(styles.nav, small && styles.dense)}>
      {pathname === "/pick" && (
        <>
          <NavButton startIcon={<KeyboardArrowLeft />} href="/">
            Return to Movies
          </NavButton>

          <NavButton startIcon={<Refresh />} onClick={() => setPick(null)}>
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
