import React from "react";

//mui
import { Typography } from "@mui/material";
import Spinner from "@/components/Spinner";
import { Message, Chat, User } from "@/models";
import useFetchData from "@/hooks/useFetchData";
import contentService from "@/services/contentService";
import useAppContext from "@/hooks/useAppContext";
import { ChatContext, SocketIoContext, UserContext } from "@/contexts";

//styles

import MessageList from "./MessageList";
import MessageBox from "./MessageBox";
import { Socket } from "socket.io";
function ChatBody() {
  const [currentChat] = useAppContext<Chat>(ChatContext);
  const [socket] = useAppContext<Socket>(SocketIoContext);
  const [chatMessages, setChatMessages] = React.useState<Partial<Message>[]>([]);

  const {
    data: messages,
    isError,
    isLoading,
  } = useFetchData<Message[]>(
    { url: "/messages", chatId: currentChat?._id },
    contentService.getMessages
  );

  React.useEffect(() => {
    setChatMessages(messages);
  }, [messages]);

  socket?.on("receive-message", (data: Message) => {
    console.log("received message: ", data.content);
    setChatMessages((chatMessages) => [...chatMessages, data]);
  });
  return (
    <>
      {isLoading ? (
        <Spinner isLoading={true} />
      ) : isError ? (
        <Typography variant="h5">Error</Typography>
      ) : messages?.length ? (
        <MessageList messages={chatMessages} />
      ) : null}
      <MessageBox setChatMessages={setChatMessages} />
    </>
  );
}

export default ChatBody;
