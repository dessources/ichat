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
import { alpha } from "@mui/material/styles";
//styles
import * as styles from "@/styles/NewChat.style";

import NewChat from "./NewChat";
import NewGroup from "./NewGroup";

function NewChatBase({ open, setOpen }: any) {
  const [username, setUsername] = React.useState("");
  const [isGroupChat, setIsGroup] = React.useState(false);
  const [selectedUsers, setSelectedUsers] = React.useState([]);
  const handleClose = () => {
    setIsGroup(false);
    setOpen(false);
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={styles.newChatBox}>
        {!isGroupChat ? (
          <NewChat
            username={username}
            setUsername={setUsername}
            setIsGroup={setIsGroup}
          />
        ) : (
          <NewGroup
            username={username}
            setUsername={setUsername}
            setIsGroup={setIsGroup}
            selectedUsers={selectedUsers}
            setSelectedUsers={setSelectedUsers}
          />
        )}
      </Box>
    </Modal>
  );
}

export default NewChatBase;
