import styles from "./titlebar.module.css";

import React from "react";
import { AppBar, Toolbar } from "@material-ui/core";

import { useResponsive } from "../../hooks/use-responsive";
import ProfileMenu from "./profile-menu";
import NavFull from "./nav-full";
import Logo from "./logo";
import NavHamburger from "./nav-hamburger";

const TitleBar = () => {
  const { small } = useResponsive();

  let isProd = false;
  if (typeof window !== "undefined") {
    isProd = window.location.hostname === "moviedecider4000.vercel.app";
  }

  console.log(isProd, typeof window, window?.location.hostname);

  const color = isProd ? "primary" : "secondary";

  return (
    <div className={styles.appBar}>
      <AppBar position="static" color={color} elevation={2}>
        <Toolbar classes={{ root: styles.toolbar }}>
          {small ? (
            <>
              <NavHamburger />
              <Logo />
            </>
          ) : (
            <>
              <Logo />
              <NavFull />
            </>
          )}
          <ProfileMenu />
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default TitleBar;
