import React from "react";
import { Message, User } from "@/models";
import useAppContext from "@/hooks/useAppContext";
import { UserContext } from "@/contexts";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";

//styles
import * as styles from "@/styles/Chat.style";
import formatTime from "@/utils/formatTime";
import { SxProps, Theme } from "@mui/material";

interface MessageListProps {
  messages: Message[];
}

function MessageList({ messages }: MessageListProps) {
  const [user] = useAppContext<User>(UserContext);
  const listRef = React.useRef<HTMLUListElement>(null);

  React.useEffect(() => {
    //Scroll to the bottom of the message list
    // to the newest messages when rendered
    const list = listRef.current;
    if (list) list.scrollTop = list.scrollHeight;
  });

  return (
    <List sx={styles.messageList} ref={listRef}>
      {messages.map((message, i) => {
        const type = user?._id === message.sender ? "sent" : "received";

        return (
          <ListItem
            key={i}
            sx={{ ...styles.message, ...styles[type] } as SxProps<Theme>}
          >
            {message.content}
            <span style={styles.time}>{formatTime(message.timestamp)} </span>
          </ListItem>
        );
      })}
    </List>
  );
}

export default MessageList;
