import Head from "next/head";

import React from "react";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";

import TitleBar from "../titlebar/titlebar";

const PageContainer = withPageAuthRequired(({ children }) => {
  return (
    <>
      <Head>
        <title>{"Movie Decider 4000"}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div>
        <TitleBar prod={process.env.IS_PROD} />

        {children}
      </div>
    </>
  );
});

export default PageContainer;
