import React from "react";
import {
  ChatContext,
  ChatMessagesContext,
  SocketIoContext,
  UserContext,
} from "@/contexts";
import {
  User,
  Chat,
  Message,
  ChatMessagesContext as ChatMessagesContextType,
} from "@/models";
import useAppContext from "@/hooks/useAppContext";
import { Socket, io } from "socket.io-client";

function SocketIoProvider(props: any) {
  const [user] = useAppContext(UserContext) as [User];
  const { chatMessages, setChatMessages } = useAppContext(
    ChatMessagesContext
  ) as ChatMessagesContextType;
  const [socket, setSocket] = React.useState<Socket | undefined>();

  React.useEffect(() => {
    let newSocket: Socket | null = null;

    //Complete the handshake with the socket.io server
    (async function () {
      if (user?.id) {
        await fetch("/api/socket/");
        newSocket = io("/", {
          query: { roomId: user?.id },
        });
        // newSocket = io("http://localhost:3001");
        newSocket.on("connect", () => {
          process.env.NODE_ENV !== "production" &&
            console.log("connected to socket.Io server id: ", newSocket?.id);
          setSocket?.(newSocket as Socket);
        });
      }
    })();

    return () => {
      newSocket?.close();
      process.env.NODE_ENV !== "production" &&
        console.log("Disconnected from socket.io");
    };
  }, [user]);

  React.useEffect(() => {
    const receiveMessageListener = (data: Message) => {
      const newMessages = chatMessages[data.chat]
        ? {
            ...chatMessages[data.chat],
            messages: [...chatMessages[data.chat].messages, data],
          }
        : { messages: [data] };

      setChatMessages?.((chatMessages) => ({
        ...chatMessages,
        [data.chat]: newMessages,
      }));
    };
    socket?.on("receive-message", receiveMessageListener);
    return () => {
      socket?.off("receive-message", receiveMessageListener);
    };
  }, [chatMessages, setChatMessages, socket]);

  return <SocketIoContext.Provider value={[socket, setSocket]} {...props} />;
}

export default SocketIoProvider;
