import React from "react";

//mui
import { Box, Typography, List, Button, TextField } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
//styles
import * as styles from "@/styles/NewChat.style";

//my components
import UserListItem from "./UserListItem";
function NewGroup({
  username,
  setUsername,
  setIsGroup,
  selectedUsers,
  setSelectedUsers,
}: any) {
  return (
    <>
      <Box sx={styles.groupChatHeader}>
        <Button onClick={() => setIsGroup(false)}>
          <ArrowBackIcon />
        </Button>
        <Typography component={"h4"}>New group</Typography>
      </Box>

      <TextField
        type="text"
        placeholder="Type a username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        sx={styles.usernameTextField}
      />

      {/* Next and Cancel buttons */}
      {/*Selected users list*/}
      {selectedUsers.length >= 0 && (
        <>
          <Box sx={styles.nextCancelButtons}>
            <Button>Next</Button>
            <Button>Cancel</Button>
          </Box>
          <Box sx={styles.selectedUsers}>
            <Button sx={styles.selectedUser}>Peter</Button>
            <Button sx={styles.selectedUser}>Norie</Button>
          </Box>
        </>
      )}

      {/* user results list */}
      <List sx={styles.userList}>
        {Array.from("this").map((x, i) => (
          <UserListItem key={i} user={{ name: "peter" }} />
        ))}
      </List>
    </>
  );
}

export default NewGroup;
