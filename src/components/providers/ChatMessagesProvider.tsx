import React from "react";

//models
import { ChatMessages, Message, ChatContext as ChatContextType } from "@/models";
import useAppContext from "@/hooks/useAppContext";
import { ChatContext, ChatMessagesContext } from "@/contexts";
import contentService from "@/services/contentService";

function ChatMessagesProvider(props: any) {
  const { currentChat, chats } = useAppContext(ChatContext) as ChatContextType;

  const currentChatId = currentChat?.id as string;
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState();

  const [chatMessages, setChatMessages] = React.useState<ChatMessages>({});

  //Initializing
  React.useEffect(() => {
    if (!Object.keys(chatMessages).length) {
      const initialChatMessages = {} as ChatMessages;
      setIsLoading(true);
      const chatArray = Object.entries(chats);

      const result = chatArray.map(async ([id, chat]) => {
        const messages = await contentService
          .getMessages(chat.id)
          .then((messages) => messages);
        initialChatMessages[chat.id] = { messages };
      });

      Promise.all(result).then(() => {
        console.log(initialChatMessages);
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
            setChatMessages((chatMessages) => ({
              ...chatMessages,
              [currentChatId]: { messages: [...currentMessages, ...messages] },
            }));
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
