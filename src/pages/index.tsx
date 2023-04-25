import Head from "next/head";
import styles from "@/styles/Home.module.css";
import React from "react";
import UnauthApp from "@/components/unauthApp";
import Ichat from "@/components/ichat";

//models
import User from "@/models/User";
import UserContextType from "@/models/UserContextType";

export const UserContext = React.createContext<UserContextType>(null);

export default function Home() {
  const [user, setUser] = React.useState<User | undefined>();
  return (
    <>
      <Head>
        <title> Ichat </title>
        <meta name="description" content="Chat app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/chat.png" />
      </Head>
      <UserContext.Provider value={{ user, setUser }}>
        <>
          {user ? (
            <Ichat />
          ) : (
            <main className={styles.main}>
              <div className={styles.header}>
                <h1>Ichat</h1>
              </div>
              <UnauthApp />
            </main>
          )}
        </>
      </UserContext.Provider>
    </>
  );
}
