import styles from "./titlebar.module.css";

import React, { useEffect, useState } from "react";
import { AppBar, Toolbar } from "@material-ui/core";

import { useResponsive } from "../../hooks/use-responsive";
import ProfileMenu from "./profile-menu";
import NavFull from "./nav-full";
import Logo from "./logo";
import NavHamburger from "./nav-hamburger";

const TitleBar = () => {
  const { small } = useResponsive();

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
