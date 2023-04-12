import * as React from "react";
import { ThemeProvider } from "@mui/material/styles";
import theme from "@/themes/ichat";
import useMediaQuery from "@mui/material/useMediaQuery";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import AppBar from "@mui/material/AppBar";
import Grid from "@mui/material/Grid";

//My Components
import ChatList from "./ChatList";
import Content from "./Content";
import Header from "./Header";
import Copyright from "./Copyright";

//styles
import * as styles from "@/styles/Ichat";
import { paper } from "@/styles/ChatList.style";
const drawerWidth = 288;

export default function Ichat() {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const isSmUp = useMediaQuery(theme.breakpoints.up("sm"));

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header onDrawerToggle={handleDrawerToggle} />
      <Box sx={{ display: "flex", minHeight: "100vh", overflow: "hidden" }}>
        <AppBar color="secondary" sx={styles.sidebar}>
          <Toolbar>
            <Grid id="thisis" container spacing={1} alignItems="center">
              xxx
            </Grid>
          </Toolbar>
        </AppBar>
        <Box
          component="nav"
          sx={{ ...styles.chatContainer, width: { sm: drawerWidth } }}
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
          <Box component="main" sx={styles.main}>
            <Content />
          </Box>
          {/* <Box component="footer" sx={{ p: 2, bgcolor: "#eaeff1" }}>
            <Copyright />
          </Box> */}
        </Box>
      </Box>
    </ThemeProvider>
  );
}
