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
import { Typography } from "@mui/material";

//styles
import * as styles from "@/styles/Chat.style";
import { avatar } from "@/styles/Ichat.style";
import ChatProfile from "./chatProfile";

export default function ChatHeader() {
  const [currentChat] = useAppContext<Chat>(ChatContext);
  const [chatProfileOpen, setChatProfileOpen] = React.useState(false);
  return (
    <React.Fragment>
      <AppBar elevation={1} sx={styles.header}>
        <Toolbar sx={styles.toolbar}>
          <Grid container spacing={1} alignItems="center">
            <Grid item onClick={() => setChatProfileOpen(true)}>
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
      <ChatProfile open={chatProfileOpen} setOpen={setChatProfileOpen} />
    </React.Fragment>
  );
}
