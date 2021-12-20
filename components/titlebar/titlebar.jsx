import React from "react";
import { AppBar, Box, Toolbar, useMediaQuery } from "@mui/material";
import { useRouter } from "next/router";
import Refresh from "@mui/icons-material/Refresh";

import { useAppContext } from "../../context/app-context";
import ProfileMenu from "./profile-menu";
import NavFull from "./nav-full";
import Logo from "./logo";
import NavHamburger from "./nav-hamburger";
import {
  appBarContainerStyles,
  PickAgainButton,
  pickScreenToolbarStyles,
  toolbarStyles,
} from "./titlebar.styles";

const TitleBar = () => {
  const { movies, setPick } = useAppContext();
  const smallLogo = useMediaQuery("(max-width: 430px)");
  const mobileNav = useMediaQuery("(max-width: 580px)");
  const { pathname } = useRouter();

  const isPickScreen = pathname === "/pick";

  return (
    <Box sx={appBarContainerStyles}>
      <AppBar position="static" color="transparent" elevation={2}>
        <Toolbar sx={[toolbarStyles, isPickScreen && pickScreenToolbarStyles]}>
          <Logo small={smallLogo} />
          {movies && (mobileNav ? <NavHamburger /> : <NavFull />)}

          {/* In the small view, keep a pick again button in the main nav area. It's also in the hamburger menu */}
          {movies && mobileNav && isPickScreen && (
            <PickAgainButton
              startIcon={<Refresh />}
              onClick={() => setPick(null)}
            >
              Pick Again
            </PickAgainButton>
          )}
          <ProfileMenu />
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default TitleBar;
