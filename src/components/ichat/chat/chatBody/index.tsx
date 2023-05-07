import React from "react";

//mui
import { Typography } from "@mui/material";
import Spinner from "@/components/Spinner";
import { Message, Chat, User } from "@/models";
import contentService from "@/services/contentService";
import useAppContext from "@/hooks/useAppContext";
import { ChatContext, SocketIoContext, UserContext } from "@/contexts";

//styles

import MessageList from "./MessageList";
import MessageBox from "./MessageBox";
import { Socket } from "socket.io";
import ChatMessagesProvider from "@/components/providers/ChatMessagesProvider";

function ChatBody() {
  const [currentChat] = useAppContext<Chat>(ChatContext);
  const [socket] = useAppContext<Socket>(SocketIoContext);
  // const [messages, setMessages] = React.useState<Message[]>([]);

  // const messagesFetchKey = {
  //   url: "/messages",
  //   chatId: currentChat?.id,
  // };

  // const {
  //   data: fetchedMessages,
  //   error,
  //   isLoading,
  // } = useSWR(messagesFetchKey, contentService.getMessages);

  // React.useEffect(() => {
  //   setMessages(fetchedMessages as Message[]);
  //   //eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  return (
    <ChatMessagesProvider>
      <MessageList />

      <MessageBox />
    </ChatMessagesProvider>
  );
}

export default ChatBody;
