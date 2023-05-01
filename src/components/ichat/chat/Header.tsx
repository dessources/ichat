import * as React from "react";
import useAppContext from "@/hooks/useAppContext";
import { ChatContext } from "@/contexts";

//models
import { Chat } from "@/models";
// mui
import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";

//styles
import * as styles from "@/styles/Chat.style";
import { avatar } from "@/styles/Ichat.style";
import { Button, Tab, Tabs, Tooltip, Typography } from "@mui/material";

export default function ChatHeader() {
  const [currentChat] = useAppContext<Chat>(ChatContext);
  return (
    <React.Fragment>
      <AppBar elevation={1} sx={styles.header}>
        <Toolbar sx={styles.toolbar}>
          <Grid container spacing={1} alignItems="center">
            <Grid item>
              <IconButton color="inherit" sx={{ p: 0.5 }}>
                <Avatar
                  src={currentChat?.chatPicture}
                  alt={currentChat?.name}
                  sx={avatar}
                >
                  {currentChat?.name?.charAt(0)}
                </Avatar>
              </IconButton>
              <Typography component={"span"} textTransform={"capitalize"}>
                {currentChat?.name}
              </Typography>
            </Grid>
            <Grid item xs />

            <Grid item></Grid>
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
                <IconButton color="inherit"></IconButton>
              </Tooltip>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <AppBar component="div" position="static" elevation={0} sx={{ zIndex: 0 }}>
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
