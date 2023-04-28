import * as React from "react";
import type { Chat } from "@/models";
//utils && hooks
import userService from "@/services/user";
import useAppContext from "@/hooks/useAppContext";
import { ChatContext, UserContext } from "@/contexts";
import ContextProvider from "@/components/ContextProvider";
//mui

import useMediaQuery from "@mui/material/useMediaQuery";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import AppBar from "@mui/material/AppBar";
import Grid from "@mui/material/Grid";

//My Components
import ChatList from "./chatList";
import Content from "./chat";
import Header from "./Header";
import Copyright from "./Copyright";

//styles
import theme from "@/themes/ichat";
import * as styles from "@/styles/Ichat";
import { paper } from "@/styles/ChatList.style";

const drawerWidth = 288;

export default function Ichat() {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const isSmUp = useMediaQuery(theme.breakpoints.up("sm"));

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
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
    <ContextProvider context={ChatContext}>
      <CssBaseline />
      <Header onDrawerToggle={handleDrawerToggle} />
      <AppBar color="secondary" sx={styles.sidebar}>
        <Toolbar>
          <Grid container spacing={1} alignItems="center">
            xxx
          </Grid>
        </Toolbar>
      </AppBar>
      <Box sx={styles.main}>
        <Box
          component="nav"
          sx={{ ...styles.chatList, width: { sm: drawerWidth } }}
        >
          {isSmUp ? null : (
            <ChatList
              PaperProps={{ sx: { ...paper, width: drawerWidth } }}
              variant="temporary"
              open={mobileOpen}
              onClose={handleDrawerToggle}
            />
          )}
          <ChatList
            PaperProps={{ sx: { ...paper, width: drawerWidth } }}
            sx={{ display: { sm: "block", xs: "none" } }}
          />
        </Box>
        <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
          <Box component="div" sx={styles.chat}>
            <Content />
          </Box>
          {/* <Box component="footer" sx={{ p: 2, bgcolor: "#eaeff1" }}>
            <Copyright />
          </Box> */}
        </Box>
      </Box>
    </ContextProvider>
  );
}
