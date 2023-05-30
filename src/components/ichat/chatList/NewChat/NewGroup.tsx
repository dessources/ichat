import React from "react";

import {
  Box,
  Avatar,
  Typography,
  ListItemButton,
  List,
  IconButton,
  Button,
  TextField,
  Checkbox,
} from "@mui/material";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
//styles
import * as styles from "@/styles/NewChat.style";

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
      <List>
        <ListItemButton sx={styles.userListItem}>
          <IconButton color="inherit" sx={{ p: 0.5 }}>
            <Avatar alt={""}>{"P"}</Avatar>
          </IconButton>
          <Typography component="span">
            {"Peter"} <Checkbox sx={styles.userListItemCheckBox} />
          </Typography>
        </ListItemButton>
        <ListItemButton sx={styles.userListItem}>
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

export default NewGroup;
