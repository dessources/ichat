import React from "react";
//contexts & hooks
import useAppContext from "@/hooks/useAppContext";
import { ChatContext, ChatMessagesContext, UserContext } from "@/contexts";
//utils
import formatTime from "@/utils/formatTime";

//models
import {
  Message,
  Chat,
  User,
  ChatMessagesContext as ChatMessagesContextType,
} from "@/models";

//mui
// import List from "@mui/material/List";
import { Box } from "@mui/material";
import { SxProps, Theme } from "@mui/material";
//my components
import CustomListItem from "@/components/CustomListItem";
//styles
import * as styles from "@/styles/Chat.style";
import Spinner from "@/components/Spinner";

function MessageList({ bottom }: any) {
  const [user] = useAppContext<User>(UserContext);
  const [currentChat] = useAppContext<Chat>(ChatContext);
  const currentChatId = currentChat?.id;
  const { chatMessages, isLoading, error } = useAppContext(
    ChatMessagesContext
  ) as ChatMessagesContextType;
  const listRef = React.useRef<HTMLUListElement>(null);

  React.useEffect(() => {
    //Scroll to the bottom of the message list
    // to the newest messages when rendered
    const list = listRef.current;
    if (list) list.scrollTop = list.scrollHeight;
  });

  const messages = chatMessages[currentChatId]?.messages.sort(
    (a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
  );
  return (
    <>
      {messages?.length ? (
        <Box sx={styles.messageList(bottom)} ref={listRef}>
          {messages.map((message, i) => {
            const type = user?.id === message.sender ? "sent" : "received";

            return (
              <Box
                key={i}
                sx={{ ...styles.message, ...styles[type] } as SxProps<Theme>}
              >
                <span>{message.content}</span>
                <span style={styles.time}>
                  {message.timestamp ? formatTime(message.timestamp) : null}
                </span>
              </Box>
            );
          })}
        </Box>
      ) : isLoading ? (
        <Spinner loading={isLoading} />
      ) : error ? (
        <p>Error</p>
      ) : null}
    </>
  );
}

export default MessageList;
