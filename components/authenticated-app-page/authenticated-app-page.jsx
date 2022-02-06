import React from "react";
import TitleBar from "../titlebar/titlebar";
import Footer from "../footer/footer";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";

/**
 * This page wraps all authenticated routes with the elements we want on all logged-in pages... title bar, theme, footer etc.
 */
const AuthenticatedAppPage = ({ Component, pageProps }) => {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "minmax(0, auto)",
        gridTemplateRows: "auto 1fr auto",
        minHeight: "100vh",
        background: "radial-gradient(#FFF, #DFDFDF 80%)",
      }}
    >
      <TitleBar />
      <Component {...pageProps} />
      <Footer />
    </div>
  );
};

export default withPageAuthRequired(AuthenticatedAppPage);
