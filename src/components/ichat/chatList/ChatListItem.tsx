import { ChatWithInterlocutor, ChatContext as ChatContextType } from "@/models";
import React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import { Avatar, IconButton, Typography, Divider, Box } from "@mui/material";
import GroupIcon from "@mui/icons-material/Group";
import * as styles from "@/styles/ChatList.style";
import { avatar } from "@/styles/Ichat.style";
import { ChatContext } from "@/contexts";
import useAppContext from "@/hooks/useAppContext";

function ChatListItem({ chat }: { chat: ChatWithInterlocutor }) {
  const { currentChat, setCurrentChat } = useAppContext(
    ChatContext
  ) as ChatContextType;

  const selected = currentChat?.secondaryId === chat?.secondaryId;

  return (
    //Somehow I had put onFocus instead of Onclick
    <Box sx={styles.chatListItem} onClick={() => setCurrentChat?.(chat)}>
      <ListItemButton sx={styles.chat} selected={selected}>
        <IconButton color="inherit" sx={{ p: 0.5 }}>
          <Avatar src={chat?.chatPicture} alt={chat?.name} sx={avatar}>
            {chat?.group ? <GroupIcon /> : chat?.name?.charAt(0)}
          </Avatar>
        </IconButton>
        <Typography component="span">{chat?.name}</Typography>
      </ListItemButton>
    </Box>
  );
}

export default ChatListItem;
