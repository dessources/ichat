import Head from "next/head";
import styles from "@/styles/Home.module.css";
import React from "react";
import UnauthApp from "@/components/UnauthApp";
import Ichat from "@/components/Ichat";
import User from "@/models/User";

export const UserContext = React.createContext<
  { user: User | undefined; setUser: Function } | undefined
>(undefined);

export default function Home() {
  const defaultUser: User = {
    id: "user1235",
    name: "peter",
    username: "quill",
    password: "",
    online: true,
    profilePicture: "",
  };
  const [user, setUser] = React.useState<User>(defaultUser);
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
