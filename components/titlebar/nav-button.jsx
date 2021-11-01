import React from "react";
import { useRouter } from "next/router";
import { Button } from "@mui/material";

const NavButton = ({ children, href, onClick, style, ...props }) => {
  const { push } = useRouter();

  return (
    <Button
      {...props}
      color="secondary"
      onClick={() => {
        onClick ? onClick() : push(href);
      }}
      style={{
        textTransform: "initial",
        fontSize: 16,
        fontWeight: 400,
        ...style,
      }}
    >
      {children}
    </Button>
  );
};

export default NavButton;
