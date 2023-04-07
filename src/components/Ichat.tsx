import * as React from "react";
import { ThemeProvider } from "@mui/material/styles";
import theme from "@/themes/ichat";
import useMediaQuery from "@mui/material/useMediaQuery";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";

import Navigator from "./Navigator";
import Navigator2 from "./Navigator2";
import Content from "./Content";
import Header from "./Header";
import Copyright from "./Copyright";

const drawerWidth = 256;

export default function Ichat() {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const isSmUp = useMediaQuery(theme.breakpoints.up("sm"));

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: "flex", minHeight: "100vh" }}>
        <CssBaseline />
        <Box component="nav" sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}>
          {isSmUp ? null : (
            <Navigator
              PaperProps={{ style: { width: drawerWidth } }}
              variant="temporary"
              open={mobileOpen}
              onClose={handleDrawerToggle}
            />
          )}
          <Navigator
            PaperProps={{ style: { width: drawerWidth } }}
            sx={{ display: { sm: "block", xs: "none" } }}
          />
          {/* <Navigator2
            PaperProps={{ style: { width: drawerWidth } }}
            sx={{ display: { sm: "block", xs: "none" } }}
          /> */}
        </Box>
        <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
          <Header onDrawerToggle={handleDrawerToggle} />
          <Box
            component="main"
            sx={{
              flex: 1,
              py: 6,
              px: 4,
              background: "url('/micro_carbon.png')",
              position: "relative",
              "&:before": {
                position: "absolute",
                background: "#081627",
                content: `" "`,
                width: "1rem",
                "z-index": -1,
                height: "1rem",
                top: 0,
                left: 0,
              },
            }}
          >
            <Content />
          </Box>
          <Box component="footer" sx={{ p: 2, bgcolor: "#eaeff1" }}>
            <Copyright />
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
