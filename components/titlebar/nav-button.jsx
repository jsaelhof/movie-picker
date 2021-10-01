import React from "react";
import { useRouter } from "next/router";
import { Button } from "@material-ui/core";

const NavButton = ({ children, href, onClick, style, ...props }) => {
  const { push } = useRouter();

  return (
    <Button
      {...props}
      onClick={() => {
        onClick ? onClick() : push(href);
      }}
      style={{
        color: "white",
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
