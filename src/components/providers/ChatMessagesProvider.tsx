import React from "react";

//models
import { ChatMessages, ChatContext as ChatContextType, Context } from "@/models";
import useAppContext from "@/hooks/useAppContext";
import { ChatContext, ChatMessagesContext, SocketIoContext } from "@/contexts";
import contentService from "@/services/contentService";
import { Socket } from "socket.io-client";

function ChatMessagesProvider(props: any) {
  const { currentChat, chats, setChats } = useAppContext(
    ChatContext
  ) as ChatContextType;

  const currentChatId = currentChat?.id as string;
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState();

  const [chatMessages, setChatMessages] = React.useState<ChatMessages>({});
const [socket] = useAppContext(SocketIoContext) as Context<Socket>
  //Initializing
  React.useEffect(() => {
    //if we have no messages get them
    if (!Object.keys(chatMessages).length) {
      const initialChatMessages = {} as ChatMessages;
      setIsLoading(true);
      const chatArray = Object.entries(chats);

      const result = chatArray.map(async ([id, chat]) => {
        const messages = await contentService
          .getMessages(chat.id)
          .then((messages) => messages);
        //loop over the messages starting from the most recent one
        //to count the unread messages
        for (let i = messages.length - 1; i > 0; i--) {
          if (messages[i].status === "read") break;
          messages[i].status !== "read" && chat.unreadMessageCount++;
        }
        initialChatMessages[chat.id] = { messages };
      });

      Promise.all(result).then(() => {
        setChatMessages(initialChatMessages);
        setIsLoading(false);
      });
    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chats]);

  React.useEffect(() => {
    if (currentChatId) {
      const currentMessages = chatMessages[currentChatId]?.messages;

      //if we have  fetched messages
      //add them to the corresponding chat
      //if the current chat has no messages fetch them
      if (currentMessages?.length) {
        const lastMessageId = currentMessages[currentMessages.length - 1].id;
        contentService
          .getMessages(currentChatId, lastMessageId)
          .then((messages) => {
             const newMessages = [...currentMessages, ...messages];
             const readMessages = [];

             for (let i = newMessages.length - 1; i > 0; i--) {
               if (newMessages[i].status === "read") break;
               newMessages[i].status = "read";
               readMessages.push(newMessages[i].id);
               chats[currentChat?.secondaryId as string].unreadMessageCount = 0;
             }

            //  socket?.emit("messages-read", {messages:readMessages})

             console.log(readMessages);
            setChatMessages((chatMessages) => {
              return {
                ...chatMessages,
                [currentChatId]: { messages: [...newMessages] },
              };
            });

            setChats(chats);
          })
          .catch((err) => setError(err));
      }
    }

    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentChatId]);

  return (
    <ChatMessagesContext.Provider
      value={{ chatMessages, setChatMessages, isLoading, error }}
      {...props}
    />
  );
}

export default ChatMessagesProvider;
