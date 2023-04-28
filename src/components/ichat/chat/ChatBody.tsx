import React from "react";

import { Box, Typography } from "@mui/material";
import Spinner from "@/components/Spinner";
import { Message, Chat, User } from "@/models";
import useFetchData from "@/hooks/useFetchData";
import contentService from "@/services/contentService";
import useAppContext from "@/hooks/useAppContext";
import { ChatContext, UserContext } from "@/contexts";

//styles
import * as styles from "@/styles/Chat.style";
import MessageList from "./MessageList";
function ChatBody() {
  const [currentChat] = useAppContext<Chat>(ChatContext);

  const {
    data: messages,
    isError,
    isLoading,
  } = useFetchData<Message[]>(
    { url: "/messages", chatId: currentChat?._id },
    contentService.getMessages
  );

  return (
    <>
      {isLoading ? (
        <Spinner isLoading={true} />
      ) : isError ? (
        <Typography variant="h5">Error</Typography>
      ) : messages?.length ? (
        <MessageList messages={messages} />
      ) : null}
      <div
        style={{
          height: "50px",
          width: "100%",
          background: "var(--dark_gray)",
          position: "fixed",
          bottom: "0",
          padding: "0.5rem",
        }}
      >
        Type a message
      </div>
    </>
  );
}

export default ChatBody;
