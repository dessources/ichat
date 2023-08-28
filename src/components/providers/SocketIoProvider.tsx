import React from "react";
import {
  ChatContext,
  ChatUsersContext,
  ChatMessagesContext,
  SocketIoContext,
  UserContext,
} from "@/contexts";

import {
  User,
  Chat,
  ChatUsers,
  Message,
  ChatMessagesContext as ChatMessagesContextType,
  ChatContext as ChatContextType,
  Context,
} from "@/models";
import useAppContext from "@/hooks/useAppContext";
import { Socket, io } from "socket.io-client";

function SocketIoProvider(props: any) {
  const [socket, setSocket] = React.useState<Socket | undefined>();
  const [user] = useAppContext(UserContext) as [User];
  const { setCurrentChat, chats, setChats, currentChat } = useAppContext(
    ChatContext
  ) as ChatContextType;
  const { chatMessages, setChatMessages } = useAppContext(
    ChatMessagesContext
  ) as ChatMessagesContextType;

  React.useEffect(() => {
    let newSocket: Socket | null = null;

    //Complete the handshake with the socket.io server
    (async function () {
      if (user?.id) {
        const socketURL =
          process.env.NODE_ENV === "production"
            ? "https://ichat-socket.onrender.com"
            : "http://localhost:3001";

        newSocket = io(socketURL, {
          query: { roomId: user?.id },
          auth: { token: process.env.NEXT_PUBLIC_API_ACCESS_TOKEN },
        });

        newSocket.on("connect", () => {
          setSocket?.(newSocket as Socket);
        });
      }
    })();

    return () => {
      newSocket?.close();
    };
  }, [user]);

  //receive message event listener
  React.useEffect(() => {
    const receiveMessageListener = (message: Message) => {
      console.log(message);
      const newMessages = chatMessages[message.chat]
        ? {
            ...chatMessages[message.chat],
            messages: [...chatMessages[message.chat].messages, message],
          }
        : { messages: [message] };

      setChatMessages?.((chatMessages) => ({
        ...chatMessages,
        [message.chat]: newMessages,
      }));

      //if the sender of the message is not the current user, designate
      //the chat with that sender's id as secondary id as the first chat
      let newCurrentChatId = message.group ? message.id : message.sender;

      if (message.sender !== user.id) setCurrentChat(chats[newCurrentChatId]);

      if (chats[newCurrentChatId]) {
        setChats((prev) => {
          console.log("this is prev:", prev);

          console.log("this is chats: ", chats);
          const newCurrentChat = prev[newCurrentChatId];
          console.log("the new current chat is: ", newCurrentChat);
          delete prev[newCurrentChatId];
          console.log("after deleting, the chats are: ", chats);
          console.log("this how chats should look like after: ", {
            [newCurrentChatId]: newCurrentChat,
            ...prev,
          });
          return {
            [newCurrentChatId]: chats[newCurrentChatId],
            ...prev,
          };
        });
      }
    };
    socket?.on("receive-message", receiveMessageListener);
    return () => {
      socket?.off("receive-message", receiveMessageListener);
    };
  }, [
    chatMessages,
    chats,
    setChatMessages,
    setChats,
    setCurrentChat,
    socket,
    user,
  ]);

  return <SocketIoContext.Provider value={[socket, setSocket]} {...props} />;
}

export default SocketIoProvider;
