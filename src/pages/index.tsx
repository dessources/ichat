import Head from "next/head";
import styles from "@/styles/Home.module.css";
import React from "react";
import UnauthApp from "@/components/UnauthApp";

import userService from "@/services/user";
export default function Home() {
  const [authenticated, setAuthenticated] = React.useState(false);
  return (
    <>
      <Head>
        <title> Ichat </title>
        <meta name="description" content="Chat app" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        />
        <link rel="icon" href="/chat.png" />
      </Head>
      {authenticated ? (
        <div>Chat away !</div>
      ) : (
        <main className={styles.main}>
          <div className={styles.header}>
            <h1>Ichat</h1>
          </div>
          <UnauthApp
            open={true}
            handleClose={undefined}
            signup={false}
            login={userService.login}
            logout={userService.logout}
            register={userService.register}
            error={undefined}
            status={""}
          />
        </main>
      )}
    </>
  );
}
