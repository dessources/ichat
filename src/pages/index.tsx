import Head from "next/head";
import { UserContext, AuthContext } from "@/contexts";
import React from "react";

//components
import UnauthApp from "@/components/unauthApp/UnauthApp";
import Ichat from "@/components/ichat/Ichat";
//mui
import { ThemeProvider } from "@mui/material/styles";

// hooks
import useAppContext from "@/hooks/useAppContext";
import ContextProvider from "@/components/providers/ContextProvider";
//styles
import theme from "@/themes/ichat";
import styles from "@/styles/Home.module.css";

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
            </div>
            <UnauthApp />
          </main>
        )}
      </ThemeProvider>
    </>
  );
}
