import React from "react";
import { v4 as uuid4 } from "uuid";
//mui
import SendIcon from "@mui/icons-material/Send";
import Box from "@mui/material/Box";
//models
import {
  Message,
  Chat,
  User,
  ChatMessages,
  ChatMessagesContext as ChatMessagesContextType,
} from "@/models";
import { Socket } from "socket.io-client";
//styles
import { input } from "@/styles/Chat.style";
//hooks & contexts
import useAppContext from "@/hooks/useAppContext";
import {
  ChatContext,
  ChatMessagesContext,
  SocketIoContext,
  UserContext,
} from "@/contexts";

// interface MessageBoxProps {
//   setChatMessages: React.Dispatch<React.SetStateAction<Message[]>>;
// }

function MessageBox() {
  const [currentChat] = useAppContext<Chat>(ChatContext);
  const currentChatId = currentChat?.id;
  const [user] = useAppContext<User>(UserContext);
  const [socket] = useAppContext<Socket>(SocketIoContext);
  const { chatMessages, setChatMessages } = useAppContext(
    ChatMessagesContext
  ) as ChatMessagesContextType;
  const [message, setMessage] = React.useState("");

  const handleSendMessage = () => {
    const data = {
      id: uuid4(),
      sender: user?.id as string,
      content: message,
      chat: currentChat?.id as string,
      timestamp: new Date().toISOString(),
    };

    const newMessages = chatMessages[currentChatId]
      ? {
          messages: [...chatMessages[currentChatId].messages, data],
          lastFetched: chatMessages[currentChatId].lastFetched,
        }
      : { messages: [data] };
    setChatMessages?.((chatMessages) => ({
      ...chatMessages,
      [currentChatId]: newMessages,
    }));
    setMessage("");
    socket?.emit("send-message", data);
  };

  return (
    <Box component="div" sx={input}>
      <textarea
        placeholder="Type a message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      ></textarea>
      <SendIcon sx={{ cursor: "pointer" }} onClick={handleSendMessage} />
    </Box>
  );
}

export default MessageBox;
