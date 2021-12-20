import React from "react";
import { useRouter } from "next/router";
import { Button } from "@mui/material";

const NavButton = ({ children, href, onClick, ...props }) => {
  const { push } = useRouter();

  return (
    <Button
      variant="nav"
      {...props}
      onClick={() => {
        onClick ? onClick() : push(href);
      }}
    >
      {children}
    </Button>
  );
};

export default NavButton;
