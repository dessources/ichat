import {
  ChatWithInterlocutor,
  ChatContext as ChatContextType,
  ChatMessagesContext as ChatMessagesContextType,
} from "@/models";

import React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import { Avatar, IconButton, Typography, Divider, Box } from "@mui/material";
import GroupIcon from "@mui/icons-material/Group";
import * as styles from "@/styles/ChatList.style";
import { avatar } from "@/styles/Ichat.style";
import { ChatContext, ChatMessagesContext } from "@/contexts";
import useAppContext from "@/hooks/useAppContext";

//styles
import formatTime from "@/utils/formatTime";

function ChatListItem({ chat }: { chat: ChatWithInterlocutor }) {
  const { currentChat, setCurrentChat } = useAppContext(
    ChatContext
  ) as ChatContextType;

  const { chatMessages } = useAppContext(
    ChatMessagesContext
  ) as ChatMessagesContextType;

  const lastMessageIndex = chatMessages[chat.id]?.messages.length - 1;
  const lastMessage = chatMessages[chat.id]?.messages[lastMessageIndex];
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
        <Box sx={styles.chatInfo}>
          <Box>
            <Typography component="span">{chat?.name}</Typography>
            <div style={styles.lastMessageExcerpt}>
              {lastMessage?.content.length > 22
                ? lastMessage?.content.slice(0, 22) + "..."
                : lastMessage?.content}
            </div>
          </Box>
          <Box sx={styles.chatDetails}>
            <span style={styles.timestamp}>
              {formatTime(lastMessage?.timestamp)}
            </span>
            {chat.unreadMessageCount! > 0 && (
              <span className="unreadMessageCount">{chat.unreadMessageCount}</span>
            )}
          </Box>
        </Box>
      </ListItemButton>
    </Box>
  );
}

export default ChatListItem;
