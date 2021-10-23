import { useRouter } from "next/router";
import React from "react";
import { KeyboardArrowLeft, Refresh } from "@mui/icons-material";
import { styled } from "@mui/material";

import { useAppContext } from "../../context/app-context";
import DbSelect from "./db-select";
import NavButton from "./nav-button";

const NavFull = () => {
  const { pathname } = useRouter();
  const { setPick } = useAppContext();

  return (
    <Nav>
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
    </Nav>
  );
};

const Nav = styled("div")(({ theme: { spacing, breakpoints } }) => ({
  gridArea: "nav",
  flexGrow: 1,
  display: "grid",
  gridAutoFlow: "column",
  gap: spacing(3),
  justifyContent: "flex-end",
  alignItems: "center",
  margin: `0 ${spacing(6)} 0 0`,

  [breakpoints.down(640)]: {
    marginRight: 24,
    gap: 8,
  },
}));

export default NavFull;
