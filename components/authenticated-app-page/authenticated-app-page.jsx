import React from "react";
import TitleBar from "../titlebar/titlebar";
import Footer from "../footer/footer";
import { ThemeProvider, StyledEngineProvider } from "@mui/material";
import { theme } from "../../theme/theme";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";

/**
 * This page wraps all authenticated routes with the elements we want on all logged-in pages... title bar, theme, footer etc.
 */
const AuthenticatedAppPage = ({ Component, pageProps }) => {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateRows: "auto 1fr auto",
        minHeight: "100vh",
        //background: "radial-gradient(#37476c, #1e1e30 80%)",
        background: "radial-gradient(#FFF, #DFDFDF 80%)",
      }}
    >
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
          <TitleBar />
          <Component {...pageProps} />
          <Footer />
        </ThemeProvider>
      </StyledEngineProvider>
    </div>
  );
};

export default withPageAuthRequired(AuthenticatedAppPage);
