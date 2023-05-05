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
import useSWR from "swr";
function ChatBody() {
  const [currentChat] = useAppContext<Chat>(ChatContext);
  const [socket] = useAppContext<Socket>(SocketIoContext);
  const [chatMessages, setChatMessages] = React.useState<Partial<Message>[]>([]);
  const messagesFetchKey = { url: "/messages", chatId: currentChat?._id };

  const {
    data: messages,
    error,
    isLoading,
  } = useSWR(messagesFetchKey, contentService.getMessages);

  React.useEffect(() => {
    console.log("setChatMessages ran");
    setChatMessages(messages as Message[]);
  }, [messages]);

  React.useEffect(() => {
    const receiveMessageListener = (data: Message) => {
      console.log(socket?.id);
      setChatMessages((chatMessages) => [
        ...chatMessages,
        { ...data, content: data.content },
      ]);
    };
    socket?.on("receive-message", receiveMessageListener);
    return () => {
      socket?.off("receive-message", receiveMessageListener);
    };
  }, [socket]);
  return (
    <>
      {isLoading ? (
        <Spinner isLoading={true} />
      ) : error ? (
        <Typography variant="h5">Error</Typography>
      ) : messages?.length ? (
        <MessageList messages={chatMessages} />
      ) : null}
      <MessageBox setChatMessages={setChatMessages} />
    </>
  );
}

export default ChatBody;
