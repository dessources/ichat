import * as React from "react";
import type { Chat } from "@/models";
//utils && hooks
import userService from "@/services/userService";
import useAppContext from "@/hooks/useAppContext";
import { ChatContext, SocketIoContext, UserContext } from "@/contexts";
import ContextProvider from "@/components/providers/ContextProvider";
//mui

import useMediaQuery from "@mui/material/useMediaQuery";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import AppBar from "@mui/material/AppBar";
import Grid from "@mui/material/Grid";

//My Components
import ChatList from "./chatList";
import ChatBox from "./chat";
import Header from "./Header";
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
  const [, setUser] = useAppContext(UserContext);

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
          <SocketIoProvider>
            <ChatList />
            <ChatBox />
          </SocketIoProvider>
        </ContextProvider>
      </Box>
    </>
  );
}
