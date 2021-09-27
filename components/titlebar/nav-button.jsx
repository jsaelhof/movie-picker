import React from "react";
import { useRouter } from "next/router";
import { Button } from "@material-ui/core";

const NavButton = ({ children, href, refresh, style, ...props }) => {
  const { reload, push } = useRouter();

  return (
    <Button
      {...props}
      onClick={() => {
        refresh ? reload() : push(href);
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
