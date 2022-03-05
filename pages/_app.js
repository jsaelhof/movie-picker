import "../css/global.css";

import React from "react";
import Head from "next/head";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { UserProvider } from "@auth0/nextjs-auth0";
import { AppProvider } from "../context/app-context";
import AuthenticatedAppPage from "../components/authenticated-app-page/authenticated-app-page";
import { ThemeProvider, StyledEngineProvider } from "@mui/material";
import { theme } from "../theme/theme";

const client = new ApolloClient({
  uri: process.env.GRAPHQL_URL,
  cache: new InMemoryCache({
    // This whole typePolicies object is required to prevent an warning when deleting a movie.
    // The warning comes from updating the cache with one less movie.
    // returning false for the merge function just tells it to just always use the new data (incoming).
    // This also runs when requesting movies, not just deleting, but the warning only happens on delete.
    // The warning was:
    // Cache data may be lost when replacing the movies field of a Query object.
    // To address this problem (which is not a bug in Apollo Client), define a custom merge function for the Query.movies field, so InMemoryCache can safely merge these objects:
    typePolicies: {
      Query: {
        fields: {
          movies: {
            merge: false,
          },
          watchedMovies: {
            merge: false,
          },
        },
      },
    },
  }),
});

function MyApp(props) {
  return (
    <UserProvider>
      <ApolloProvider client={client}>
        <StyledEngineProvider injectFirst>
          <ThemeProvider theme={theme}>
            <AppProvider>
              <Head>
                <title>Movie Decider 4000</title>
                <link rel="icon" href="/favicon.ico" />
                <link rel="apple-touch-icon" href="touch-icon-iphone.png" />
                <meta name="apple-mobile-web-app-title" content="MD4000"></meta>
                <meta name="apple-mobile-web-app-capable" content="yes"></meta>
                <meta
                  name="apple-mobile-web-app-status-bar-style"
                  content="black"
                ></meta>
              </Head>
              <AuthenticatedAppPage {...props} />
            </AppProvider>
          </ThemeProvider>
        </StyledEngineProvider>
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
