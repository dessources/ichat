import Head from "next/head";
import styles from "@/styles/Home.module.css";
import React from "react";
import UnauthApp from "@/components/unauthApp";
import Ichat from "@/components/ichat";

//models
import { User, UserContextType, AuthContextType } from "@/models";

export const UserContext = React.createContext<UserContextType>(null);
export const AuthContext = React.createContext<AuthContextType>(null);

export default function Home() {
  const [user, setUser] = React.useState<User | undefined>();
  const [auth, setAuth] = React.useState<boolean>(false);
  return (
    <>
      <Head>
        <title> Ichat </title>
        <meta name="description" content="Chat app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/chat.png" />
      </Head>
      <AuthContext.Provider value={{ auth, setAuth }}>
        <UserContext.Provider value={{ user, setUser }}>
          <>
            {auth ? (
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
      </AuthContext.Provider>
    </>
  );
}
