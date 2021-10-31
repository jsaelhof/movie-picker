import styles from "./titlebar.module.css";

import React from "react";
import { AppBar, Toolbar } from "@material-ui/core";
import { useRouter } from "next/router";
import clsx from "clsx";
import Refresh from "@material-ui/icons/Refresh";

import { useAppContext } from "../../context/app-context";
import ProfileMenu from "./profile-menu";
import NavFull from "./nav-full";
import Logo from "./logo";
import NavHamburger from "./nav-hamburger";
import NavButton from "./nav-button";
import { useMediaQuery } from "@material-ui/core";

const TitleBar = () => {
  const { movies, setPick } = useAppContext();
  const smallLogo = useMediaQuery("(max-width: 430px)");
  const mobileNav = useMediaQuery("(max-width: 580px)");
  const { pathname } = useRouter();

  return (
    <div className={styles.appBar}>
      <AppBar position="static" color="transparent" elevation={2}>
        <Toolbar
          classes={{
            root: clsx(
              styles.toolbar,
              mobileNav && styles.smallToolbar,
              pathname === "/pick" && mobileNav && styles.smallPickToolbar
            ),
          }}
        >
          <Logo small={smallLogo} />
          {movies && (mobileNav ? <NavHamburger /> : <NavFull />)}

          {/* In the small view, keep a pick again button in the ain nav area. It's also in the hamburger menu */}
          {movies && mobileNav && pathname === "/pick" && (
            <NavButton
              startIcon={<Refresh />}
              onClick={() => setPick(null)}
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
