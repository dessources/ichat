import React from "react";
//contexts & hooks
import useAppContext from "@/hooks/useAppContext";
import { SocketIoContext, UserContext } from "@/contexts";
//utils
import formatTime from "@/utils/formatTime";

//models
import { Message, User } from "@/models";
import { Socket } from "socket.io";
//mui
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { SxProps, Theme } from "@mui/material";

//styles
import * as styles from "@/styles/Chat.style";

interface MessageListProps {
  messages: Partial<Message>[];
}

function MessageList({ messages }: MessageListProps) {
  const [user] = useAppContext<User>(UserContext);
  const [socket] = useAppContext<Socket>(SocketIoContext);
  const listRef = React.useRef<HTMLUListElement>(null);

  React.useEffect(() => {
    //Scroll to the bottom of the message list
    // to the newest messages when rendered
    const list = listRef.current;
    if (list) list.scrollTop = list.scrollHeight;
  });

  return (
    <>
      {messages?.length ? (
        <List sx={styles.messageList} ref={listRef}>
          {messages.map((message, i) => {
            const type = user?._id === message.sender ? "sent" : "received";

            return (
              <ListItem
                key={i}
                sx={{ ...styles.message, ...styles[type] } as SxProps<Theme>}
              >
                {message.content}
                <span style={styles.time}>
                  {message.timestamp
                    ? formatTime(message.timestamp as string)
                    : null}
                </span>
              </ListItem>
            );
          })}
        </List>
      ) : null}
    </>
  );
}

export default MessageList;
