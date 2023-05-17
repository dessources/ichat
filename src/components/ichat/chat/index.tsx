import * as React from "react";
import Image from "next/image";
import { Box, Typography } from "@mui/material";

//hooks & context
import useAppContext from "@/hooks/useAppContext";
import { ChatContext } from "@/contexts";

//models
import { Chat as ChatType } from "@/models";
//my components
import ChatHeader from "./Header";
import MessageList from "./MessageList";
import MessageBox from "./MessageBox";
//styles
import * as styles from "@/styles/Ichat.style";

function ChatBodyWrapper() {
  const [bottom, setBottom] = React.useState("50px");

  return (
    <>
      <MessageList bottom={bottom} />
      <MessageBox setBottom={setBottom} />
    </>
  );
}
export default function Chat() {
  const [currentChat] = useAppContext<ChatType>(ChatContext);

  return currentChat ? (
    <Box sx={styles.chat}>
      <ChatHeader />
      <ChatBodyWrapper />
    </Box>
  ) : (
    <Box sx={styles.noChatSelected}>
      <Image src="/chat.png" width="80" height="80" alt="" />
      <Typography variant="h3">Ichat</Typography>
      <Typography>Send and receive messages. Chat, your way...</Typography>
    </Box>
  );
}
