import styles from "./titlebar.module.css";

import React from "react";
import { AppBar, ThemeProvider, Toolbar } from "@material-ui/core";
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
import { theme } from "../../theme/nav-theme";

const TitleBar = () => {
  const { movies, setPick } = useAppContext();
  const { small } = useResponsive();
  const { pathname } = useRouter();

  return (
    <ThemeProvider theme={theme}>
      <div className={styles.appBar}>
        <AppBar position="static" color="transparent" elevation={2}>
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
    </ThemeProvider>
  );
};

export default TitleBar;
