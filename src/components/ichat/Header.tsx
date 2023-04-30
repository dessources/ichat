import * as React from "react";
import useAppContext from "@/hooks/useAppContext";
import { UserContext } from "@/contexts";

//models
import { User } from "@/models";
// mui
import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import Image from "next/image";

//styles
import * as styles from "@/styles/Header.style";
import { avatar } from "@/styles/Ichat.style";

const lightColor = "rgba(255, 255, 255, 0.7)";

export default function Header() {
  const [user] = useAppContext<User>(UserContext);
  return (
    <React.Fragment>
      <AppBar color="secondary" position="fixed" elevation={1} sx={styles.root}>
        <Toolbar sx={styles.toolbar}>
          <Grid container spacing={1} alignItems="center">
            <Grid item>
              <Box
                sx={{
                  fontSize: 22,
                  color: "#fff",
                  padding: "0.4rem 0.5rem",
                }}
              >
                <Image
                  src="/chat.png"
                  width="30"
                  height="30"
                  alt=""
                  style={styles.logo}
                />{" "}
                Ichat
              </Box>
            </Grid>
            <Grid item xs />

            <Grid item>
              <IconButton color="inherit" sx={{ p: 0.5 }}>
                <Avatar src={user?.profilePicture} alt="My Avatar" sx={avatar}>
                  {user?.name.charAt(0)}
                </Avatar>
              </IconButton>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      {/* <AppBar
        component="div"
        color="primary"
        position="static"
        elevation={0}
        sx={{ zIndex: 0 }}
      >
        <Toolbar>
          <Grid container alignItems="center" spacing={1}>
            <Grid item xs>
              <Typography color="secondary" variant="h5" component="h1">
                Authentication
              </Typography>
            </Grid>
            <Grid item>
              <Button
                sx={{ borderColor: lightColor }}
                variant="outlined"
                color="inherit"
                size="small"
              >
                Web setup
              </Button>
            </Grid>
            <Grid item>
              <Tooltip title="Help">
                <IconButton color="inherit">
                  <HelpIcon />
                </IconButton>
              </Tooltip>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar> */}
      {/* <AppBar component="div" position="static" elevation={0} sx={{ zIndex: 0 }}>
        <Tabs value={0} textColor="inherit">
          <Tab label="Users" />
          <Tab label="Sign-in method" />
          <Tab label="Templates" />
          <Tab label="Usage" />
        </Tabs>
      </AppBar> */}
    </React.Fragment>
  );
}
