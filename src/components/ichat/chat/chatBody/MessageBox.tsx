import React from "react";

//mui
import SendIcon from "@mui/icons-material/Send";
import Box from "@mui/material/Box";
//models
import { Message, Chat, User } from "@/models";
import { Socket } from "socket.io-client";
//styles
import { input } from "@/styles/Chat.style";
//hooks & contexts
import useAppContext from "@/hooks/useAppContext";
import { ChatContext, SocketIoContext, UserContext } from "@/contexts";

interface MessageBoxProps {
  setChatMessages: React.Dispatch<React.SetStateAction<Partial<Message>[]>>;
}

function MessageBox({ setChatMessages }: MessageBoxProps) {
  const [currentChat] = useAppContext<Chat>(ChatContext);
  const [user] = useAppContext<User>(UserContext);
  const [socket] = useAppContext<Socket>(SocketIoContext);

  const [message, setMessage] = React.useState("");

  const handleSendMessage = () => {
    const data = {
      sender: user?._id,
      content: message,
      chat: currentChat?._id,
      timestamp: new Date().toISOString(),
    };
    setChatMessages((chatMessages) => [...chatMessages, data]);
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
