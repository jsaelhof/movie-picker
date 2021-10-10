import "../css/global.css";

import React from "react";
import Head from "next/head";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { UserProvider } from "@auth0/nextjs-auth0";
import { AppProvider } from "../context/app-context";
import TitleBar from "../components/titlebar/titlebar";
import Footer from "../components/footer/footer";
import { ThemeProvider } from "@material-ui/core";
import { theme } from "../theme/theme";

const client = new ApolloClient({
  uri: process.env.GRAPHQL_URL,
  cache: new InMemoryCache(),
});

function MyApp({ Component, pageProps }) {
  return (
    <UserProvider>
      <ApolloProvider client={client}>
        <AppProvider>
          <Head>
            <title>Movie Decider 4000</title>
            <link rel="icon" href="/favicon.ico" />
            <link rel="apple-touch-icon" href="touch-icon-iphone.png" />
            <meta name="apple-mobile-web-app-title" content="MD4000"></meta>
          </Head>
          <div
            style={{
              display: "grid",
              gridTemplateRows: "auto 1fr auto",
              minHeight: "100vh",
              //background: "radial-gradient(#37476c, #1e1e30 80%)",
              background: "radial-gradient(#FFF, #DFDFDF 80%)",
            }}
          >
            <ThemeProvider theme={theme}>
              <TitleBar />
              <Component {...pageProps} />
              <Footer />
            </ThemeProvider>
          </div>
        </AppProvider>
      </ApolloProvider>
    </UserProvider>
  );
}

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
//
// MyApp.getInitialProps = async (appContext) => {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const appProps = await App.getInitialProps(appContext);
//
//   return { ...appProps }
// }

export default MyApp;
