import * as React from "react";
import type { Chat as ChatType, User } from "@/models";
//utils && hooks
import userService from "@/services/userService";
import useAppContext from "@/hooks/useAppContext";
import { ChatContext, UserContext } from "@/contexts";
import ContextProvider from "@/components/providers/ContextProvider";
import ChatMessagesProvider from "@/components/providers/ChatMessagesProvider";

//mui
import useMediaQuery from "@mui/material/useMediaQuery";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";

//My Components
import ChatList from "./chatList";
import Chat from "./chat";
import Header from "./header";
import Copyright from "./Copyright";

//styles
import theme from "@/themes/ichat";
import * as styles from "@/styles/Ichat.style";

import Sidebar from "./Sidebar";
import SocketIoProvider from "../providers/SocketIoProvider";

export default function Ichat() {
  // const [mobileOpen, setMobileOpen] = React.useState(false);
  // const isSmUp = useMediaQuery(theme.breakpoints.up("sm"));

  // const handleDrawerToggle = () => {
  //   setMobileOpen(!mobileOpen);
  // };
  const [, setUser] = useAppContext(UserContext) as [
    null,
    React.Dispatch<React.SetStateAction<User>>
  ];

  React.useEffect(() => {
    //get the user's info once he's logged in
    userService
      .getUser()
      .then((user) => {
        setUser?.(user);
      })
      .catch((err) => console.error("user not found", err)); //set error state
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <CssBaseline />
      <Header />
      <Sidebar />
      <Box sx={styles.main}>
        <ContextProvider context={ChatContext}>
          <ChatMessagesProvider>
            <SocketIoProvider>
              <ChatList />
              <Chat />
            </SocketIoProvider>
          </ChatMessagesProvider>
        </ContextProvider>
      </Box>
    </>
  );
}
