import React from "react";
import { AppBar, Toolbar, styled } from "@mui/material";
import { useRouter } from "next/router";
import Refresh from "@mui/icons-material/Refresh";

import { useAppContext } from "../../context/app-context";
import ProfileMenu from "./profile-menu";
import NavFull from "./nav-full";
import Logo from "./logo";
import NavHamburger from "./nav-hamburger";
import NavButton from "./nav-button";
import { useMediaQuery } from "@mui/material";

const TitleBar = () => {
  const { movies, setPick } = useAppContext();
  const smallLogo = useMediaQuery("(max-width: 430px)");
  const mobileNav = useMediaQuery("(max-width: 580px)");
  const { pathname } = useRouter();

  return (
    <AppBarContainer>
      <AppBar position="static" color="transparent" elevation={2}>
        <StyledToolbar $isPickScreen={pathname === "/pick"}>
          <Logo small={smallLogo} />
          {movies && (mobileNav ? <NavHamburger /> : <NavFull />)}

          {/* In the small view, keep a pick again button in the ain nav area. It's also in the hamburger menu */}
          {movies && mobileNav && pathname === "/pick" && (
            <PickAgainButton
              startIcon={<Refresh />}
              onClick={() => setPick(null)}
            >
              Pick Again
            </PickAgainButton>
          )}
          <ProfileMenu />
        </StyledToolbar>
      </AppBar>
    </AppBarContainer>
  );
};

const AppBarContainer = styled("div")(({ theme: { palette } }) => ({
  flexGrow: 1,
  zIndex: 1000,
  background: `linear-gradient(75deg, ${palette.darkBlue[500]}, ${palette.darkBlue[900]} 80%)`,
}));

const StyledToolbar = styled(Toolbar)(
  ({ theme: { breakpoints }, $isPickScreen }) => ({
    display: "grid",
    gridTemplateColumns: "auto 1fr auto",
    gridTemplateAreas: `"logo nav profile"`,
    minHeight: "64px",

    [breakpoints.down(580)]: {
      ...($isPickScreen
        ? {
            gridTemplateAreas: `"nav logo pick profile"`,
            gridTemplateColumns: "auto max-content 1fr auto",
          }
        : { gridTemplateAreas: `"nav logo profile"` }),
    },
  })
);

const PickAgainButton = styled(NavButton)(({ theme: { spacing } }) => ({
  gridArea: "pick",
  marginRight: spacing(2),
  marginLeft: "auto",
}));

export default TitleBar;
