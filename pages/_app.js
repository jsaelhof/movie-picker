import "../css/global.css";

import React from "react";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { UserProvider } from "@auth0/nextjs-auth0";
import { AppProvider } from "../context/app-context";
import PageContainer from "../components/page-container/page-container";

const client = new ApolloClient({
  uri: process.env.GRAPHQL_URL,
  cache: new InMemoryCache(),
});

function MyApp({ Component, pageProps }) {
  return (
    <UserProvider>
      <ApolloProvider client={client}>
        <AppProvider>
          <PageContainer>
            <Component {...pageProps} />
          </PageContainer>
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
