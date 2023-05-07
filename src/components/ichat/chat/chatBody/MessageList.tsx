import React from "react";
//contexts & hooks
import useAppContext from "@/hooks/useAppContext";
import {
  ChatContext,
  ChatMessagesContext,
  SocketIoContext,
  UserContext,
} from "@/contexts";
//utils
import formatTime from "@/utils/formatTime";

//models
import {
  ChatMessages,
  Message,
  Chat,
  User,
  ChatMessagesContext as ChatMessagesContextType,
} from "@/models";
import { Socket } from "socket.io";
//mui
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { SxProps, Theme } from "@mui/material";

//styles
import * as styles from "@/styles/Chat.style";
import Spinner from "@/components/Spinner";

function MessageList() {
  const [user] = useAppContext<User>(UserContext);
  const [currentChat] = useAppContext<Chat>(ChatContext);
  const currentChatId = currentChat?.id;
  const [socket] = useAppContext<Socket>(SocketIoContext);
  const { chatMessages, setChatMessages, isLoading, error } = useAppContext(
    ChatMessagesContext
  ) as ChatMessagesContextType;
  const listRef = React.useRef<HTMLUListElement>(null);

  React.useEffect(() => {
    //Scroll to the bottom of the message list
    // to the newest messages when rendered
    const list = listRef.current;
    if (list) list.scrollTop = list.scrollHeight;
  });

  React.useEffect(() => {
    const receiveMessageListener = (data: Message) => {
      console.log(socket?.id);

      const newMessages = chatMessages[data.chat]
        ? {
            ...chatMessages[data.chat],
            messages: [...chatMessages[data.chat].messages, data],
          }
        : { messages: [data] };

      setChatMessages?.((chatMessages) => ({
        ...chatMessages,
        [data.chat]: newMessages,
      }));
    };
    socket?.on("receive-message", receiveMessageListener);
    return () => {
      socket?.off("receive-message", receiveMessageListener);
    };
  }, [socket, currentChatId, chatMessages, setChatMessages]);

  const messages = chatMessages[currentChatId]?.messages;
  return (
    <>
      {messages?.length ? (
        <List sx={styles.messageList} ref={listRef}>
          {messages.map((message, i) => {
            const type = user?.id === message.sender ? "sent" : "received";

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
      ) : isLoading ? (
        <Spinner loading={isLoading} />
      ) : error ? (
        <p>Error</p>
      ) : null}
    </>
  );
}

export default MessageList;
