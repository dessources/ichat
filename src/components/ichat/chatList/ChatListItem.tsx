import { Chat } from "@/models";
import React from "react";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import { Avatar, IconButton, Typography, Divider } from "@mui/material";

import * as styles from "@/styles/ChatList.style";
import { avatar } from "@/styles/Ichat.style";
import { ChatContext } from "@/contexts";
import useAppContext from "@/hooks/useAppContext";

function ChatListItem({ chat }: { chat: Chat }) {
  const [currentChat, setCurrentChat] = useAppContext(ChatContext);
  return (
    <ListItem
      disablePadding
      sx={styles.chatListItem}
      onFocus={() => setCurrentChat?.(chat)}
    >
      <ListItemButton sx={styles.chat}>
        <IconButton color="inherit" sx={{ p: 0.5 }}>
          <Avatar src={chat.chatPicture} alt={chat.name} sx={avatar}>
            {chat?.name?.charAt(0)}
          </Avatar>
        </IconButton>
        <Typography component="span">{chat.name}</Typography>
      </ListItemButton>
      <Divider sx={{ mt: 5 }} />
    </ListItem>
  );
}

export default ChatListItem;
