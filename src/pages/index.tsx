import Head from "next/head";
import styles from "@/styles/Home.module.css";
import React from "react";
import UnauthApp from "@/components/unauthApp";
import Ichat from "@/components/ichat";
import { UserContext, AuthContext } from "@/contexts";
import { ThemeProvider } from "@mui/material/styles";
// hooks
import useAppContext from "@/hooks/useAppContext";
import ContextProvider from "@/components/providers/ContextProvider";
//styles
import theme from "@/themes/ichat";

export default function Home() {
  const [auth] = useAppContext(AuthContext);

  return (
    <>
      <Head>
        <title> Ichat </title>
        <meta name="description" content="Chat app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/chat.png" />
      </Head>

      <ThemeProvider theme={theme}>
        {auth ? (
          <ContextProvider context={UserContext}>
            <Ichat />
          </ContextProvider>
        ) : (
          <main className={styles.main}>
            <div className={styles.header}>
              <h1>Ichat</h1>
              <p>MONGO DB URI: {process.env.MONGODB_URI}; API ACCESS TOKEN{process.env.NEXT_PUBLIC_API_ACCESS_TOKEN}</p>
            </div>
            <UnauthApp />
          </main>
        )}
      </ThemeProvider>
    </>
  );
}
