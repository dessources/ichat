import React from "react";

//mui
import { Modal, Box } from "@mui/material";

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
