import React from "react";

//mui
import SendIcon from "@mui/icons-material/Send";
import { Box, Typography } from "@mui/material";
import Spinner from "@/components/Spinner";
import { Message, Chat, User } from "@/models";
import useFetchData from "@/hooks/useFetchData";
import contentService from "@/services/contentService";
import useAppContext from "@/hooks/useAppContext";
import { ChatContext } from "@/contexts";

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
      <Box component="div" sx={styles.input}>
        <textarea placeholder="Type a message..."></textarea>
        <SendIcon sx={{ cursor: "pointer" }} />
      </Box>
    </>
  );
}

export default ChatBody;
