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
      await fetch("/api/socket.io");
      newSocket = io("/", { query: { roomId: user?.id } });

      newSocket.on("connect", () => {
        console.log("connected to socket.Io server id: ", newSocket?.id);
        setSocket?.(newSocket as Socket);
      });
    })();

    return () => {
      newSocket?.close();
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
