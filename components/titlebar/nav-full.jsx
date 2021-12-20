import { useRouter } from "next/router";
import React from "react";
import { KeyboardArrowLeft, Refresh } from "@mui/icons-material";

import { Nav } from "./nav-full.styles";
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

export default NavFull;
