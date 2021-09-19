import styles from "./titlebar.module.css";

import React, { useEffect, useState } from "react";
import { AppBar, Toolbar } from "@material-ui/core";
import clsx from "clsx";

import { useResponsive } from "../../hooks/use-responsive";
import { useAppContext } from "../../context/app-context";
import ProfileMenu from "./profile-menu";
import NavFull from "./nav-full";
import Logo from "./logo";
import NavHamburger from "./nav-hamburger";

const TitleBar = () => {
  const { movies } = useAppContext();
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
        <Toolbar
          classes={{ root: clsx(styles.toolbar, small && styles.smallToolbar) }}
        >
          <Logo />
          {movies && (small ? <NavHamburger /> : <NavFull />)}
          <ProfileMenu />
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default TitleBar;
