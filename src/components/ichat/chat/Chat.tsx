import * as React from "react";
import Image from "next/image";
import { Box, Typography } from "@mui/material";

//hooks & context
import useAppContext from "@/hooks/useAppContext";
import {
  ChatContext,
  ChatUsersContext,
  UserContext,
  ChatMessagesContext,
  SocketIoContext,
} from "@/contexts";
import contentService from "@/services/contentService";

//models
import {
  ChatContext as ChatContextType,
  ChatMessagesContext as ChatMessagesContextType,
  Chat as ChatType,
  ChatUsers,
  User,
  Context,
} from "@/models";
import type { Socket } from "socket.io-client";
//my components
import ChatHeader from "./Header";
import MessageList from "./MessageList";
import MessageBox from "./MessageBox";
//styles
import * as styles from "@/styles/Ichat.style";
import userService from "@/services/userService";

export default function Chat() {
  const { currentChat, setChats } = useAppContext(ChatContext) as ChatContextType;
  const currentChatId = currentChat?.id as string;
  const [currentUser] = useAppContext(UserContext) as [User];
  const [chatUsers, setChatUsers] = useAppContext(
    ChatUsersContext
  ) as Context<ChatUsers>;

  const { chatMessages, setChatMessages, setError } = useAppContext(
    ChatMessagesContext
  ) as ChatMessagesContextType;

  const [socket] = useAppContext(SocketIoContext) as Context<Socket>;

  React.useEffect(() => {
    //if we do not have the data for the other chat participants
    //for the current chat, fetch'em
    if (currentChatId && !chatUsers?.[currentChatId]?.length) {
      const chatUsersPromise = currentChat?.users
        .filter((id) => id !== currentUser?.id)
        .map((id) => userService.getUser(id));

      Promise.all(chatUsersPromise as Promise<User>[]).then((result) => {
        setChatUsers?.((prev) => ({
          ...prev,
          [currentChatId]: result,
        }));
      });
    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chatUsers, currentChat, setChatUsers]);

  React.useEffect(() => {
    if (currentChat) {
      setChats((prev) => ({
        ...prev,
        [currentChat.secondaryId as string]: {
          ...currentChat,
          unreadMessageCount: 0,
        },
      }));

      const currentMessages = chatMessages[currentChatId]?.messages;
      //if we have  fetched messages
      //add them to the corresponding chat
      //if the current chat has no messages fetch them
      if (currentMessages?.length) {
        const lastMessageId = currentMessages[currentMessages.length - 1].id;
        contentService
          .getMessages(currentChatId, lastMessageId)
          .then((messages) => {
            const newMessages = [...currentMessages, ...messages];
            const readMessages = [];
            for (let i = newMessages.length - 1; i > 0; i--) {
              if (
                newMessages[i].sender !== currentUser?.id ||
                newMessages[i].status === "read"
              )
                break;
              newMessages[i].status = "read";
              readMessages.push(newMessages[i].id);
            }

            setChatMessages((prev) => ({
              ...prev,
              [currentChatId]: { messages: newMessages },
            }));
            // console.log("the interlocutor ", currentChat.interlocutorId);
            //send socket message for read messages
            socket?.emit("messages-read", {
              messageIds: readMessages,
              sender: currentChat.interlocutorId,
              chatId: currentChatId,
            });
          })
          .catch((err) => setError(err));
      }
    }

    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentChatId]);

  return currentChat ? (
    <Box sx={styles.chat}>
      <ChatHeader />
      <ChatBodyWrapper />
    </Box>
  ) : (
    <Box sx={styles.emptyChatArea}>
      <Image src="/chat.png" width="80" height="80" alt="" />
      <Typography variant="h3">Ichat</Typography>
      <Typography>Send and receive messages. Chat, your way...</Typography>
    </Box>
  );
}

function ChatBodyWrapper() {
  const [bottom, setBottom] = React.useState("50px");

  return (
    <>
      <MessageList bottom={bottom} />
      <MessageBox setBottom={setBottom} />
    </>
  );
}
