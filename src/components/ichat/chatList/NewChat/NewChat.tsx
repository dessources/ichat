import React from "react";
import { Box, TextField, Avatar, Typography, List } from "@mui/material";
import GroupIcon from "@mui/icons-material/Group";

//styles
import * as styles from "@/styles/NewChat.style";
import UserListItem from "./UserListItem";

function NewChat({ username, setUsername, setSlide }: any) {
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

      <Box sx={styles.groupChatButton} onClick={() => setSlide(1)}>
        <Avatar sx={styles.groupChatIcon}>
          <GroupIcon />
        </Avatar>
        <Typography> New group chat</Typography>
      </Box>
      {/* user results list */}
      <List sx={styles.userList} id="ok">
        {[1, 1, , 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 31].map((x, i) => (
          <UserListItem user={{ name: "peter" }} isGroup={false} key={i} />
        ))}
      </List>
    </>
  );
}
export default NewChat;
