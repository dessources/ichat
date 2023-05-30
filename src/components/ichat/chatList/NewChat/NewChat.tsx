import React from "react";
import {
  Modal,
  Box,
  TextField,
  Avatar,
  Typography,
  ListItemButton,
  List,
  IconButton,
  Button,
} from "@mui/material";
import GroupIcon from "@mui/icons-material/Group";

//styles
import * as styles from "@/styles/NewChat.style";

function NewChat({ username, setUsername, setIsGroup }: any) {
  return (
    <>
      <Typography component="h4" sx={styles.newChatHeader}>
        New Chat
      </Typography>

      <TextField
        type="text"
        placeholder="Type a username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        sx={styles.usernameTextField}
        // inputProps={{}
      />

      {/*New group chat button*/}

      <Box sx={styles.groupChatButton} onClick={() => setIsGroup(true)}>
        <Avatar sx={styles.groupChatIcon}>
          <GroupIcon />
        </Avatar>
        <Typography> New group chat</Typography>
      </Box>
      {/* user results list */}
      <List>
        <ListItemButton
          sx={{ "&:hover": { background: "rgba(255, 255, 255, 0.08)" } }}
        >
          <IconButton color="inherit" sx={{ p: 0.5 }}>
            <Avatar alt={""}>{"P"}</Avatar>
          </IconButton>
          <Typography component="span">{"Peter"}</Typography>
        </ListItemButton>
        <ListItemButton>
          <IconButton color="inherit" sx={{ p: 0.5 }}>
            <Avatar alt={""}>{"P"}</Avatar>
          </IconButton>
          <Typography component="span">{"Peter"}</Typography>
        </ListItemButton>
        <ListItemButton>
          <IconButton color="inherit" sx={{ p: 0.5 }}>
            <Avatar alt={""}>{"P"}</Avatar>
          </IconButton>
          <Typography component="span">{"Peter"}</Typography>
        </ListItemButton>
      </List>
    </>
  );
}
export default NewChat;
