import React from "react";
import { Message, User } from "@/models";
import useAppContext from "@/hooks/useAppContext";
import { UserContext } from "@/contexts";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
//styles
import * as styles from "@/styles/Chat.style";

interface MessageListProps {
  messages: Message[];
}

function MessageList({ messages }: MessageListProps) {
  const [user] = useAppContext<User>(UserContext);
  return (
    <List style={styles.messageList}>
      {messages.map((message, i) => {
        return (
          <ListItem key={i} style={styles.message(message, user as User)}>
            {message.content}
          </ListItem>
        );
      })}
    </List>
  );
}

export default MessageList;
