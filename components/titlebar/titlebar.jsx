import styles from "./titlebar.module.css";

import React, { useEffect, useState } from "react";
import { AppBar, Button, Toolbar } from "@material-ui/core";
import { useRouter } from "next/router";
import clsx from "clsx";
import Refresh from "@material-ui/icons/Refresh";

import { useResponsive } from "../../hooks/use-responsive";
import { useAppContext } from "../../context/app-context";
import ProfileMenu from "./profile-menu";
import NavFull from "./nav-full";
import Logo from "./logo";
import NavHamburger from "./nav-hamburger";
import NavButton from "./nav-button";

const TitleBar = () => {
  const { movies } = useAppContext();
  const { small } = useResponsive();
  const { pathname, reload } = useRouter();

  // TODO: Find a better way to tell if this is prod. Cna the server send env vars to the client? Maybe implement a graphql query to have the server return it from its process env?
  const [isProd, setIsProd] = useState(false);
  useEffect(() => {
    if (!isProd && window.location.hostname === "moviedecider4000.vercel.app") {
      setIsProd(true);
    }
  }, []);

  const color = isProd ? "primary" : "secondary";

  return (
    <div className={styles.appBar}>
      <AppBar position="static" color={color} elevation={2}>
        <Toolbar
          classes={{
            root: clsx(
              styles.toolbar,
              small && styles.smallToolbar,
              pathname === "/pick" && small && styles.smallPickToolbar
            ),
          }}
        >
          <Logo />
          {movies && (small ? <NavHamburger /> : <NavFull />)}

          {/* In the small view, keep a pick again button in the ain nav area. It's also in the hamburger menu */}
          {movies && small && pathname === "/pick" && (
            <NavButton
              startIcon={<Refresh />}
              refresh
              className={styles.pickAgain}
            >
              Pick Again
            </NavButton>
          )}
          <ProfileMenu />
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default TitleBar;
