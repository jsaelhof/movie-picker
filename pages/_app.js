import "../css/global.css";

import React from "react";
import Head from "next/head";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { UserProvider } from "@auth0/nextjs-auth0";
import { AppProvider } from "../context/app-context";
import { useResponsive } from "../hooks/use-responsive";
import TitleBar from "../components/titlebar/titlebar";
import Footer from "../components/footer/footer";

const client = new ApolloClient({
  uri: process.env.GRAPHQL_URL,
  cache: new InMemoryCache(),
});

function MyApp({ Component, pageProps }) {
  const { mobile } = useResponsive();
  return (
    <UserProvider>
      <ApolloProvider client={client}>
        <AppProvider>
          <Head>
            <title>Movie Decider 4000</title>
            <link rel="icon" href="/favicon.ico" />
          </Head>
          <div
            style={{
              display: "grid",
              gridTemplateRows: "auto 1fr auto",
              height: "100vh",
            }}
          >
            <TitleBar />
            <div style={{ padding: mobile ? "0 38px" : "0 44px" }}>
              <Component {...pageProps} />
            </div>
            <Footer />
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
