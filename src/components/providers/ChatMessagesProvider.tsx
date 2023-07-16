import React from "react";

//models
import {
  ChatMessages,
  Message,
  Chat,
  ChatContext as ChatContextType,
} from "@/models";
import useAppContext from "@/hooks/useAppContext";
import { ChatContext, ChatMessagesContext } from "@/contexts";
import contentService from "@/services/contentService";

function ChatMessagesProvider(props: any) {
  const { currentChat } = useAppContext(ChatContext) as ChatContextType;

  const currentChatId = currentChat?.id as string;
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState();
  const [newMessages, setNewMessages] = React.useState<
    { messages: Message[]; lastFetched: Date } | undefined
  >();
  const [chatMessages, setChatMessages] = React.useState<ChatMessages>({});
  const sentAfter = chatMessages[currentChatId]?.lastFetched?.getTime() ?? 0;
  // const firstFetch = React.useRef(true);
  // const messagesFetchKey = {
  //   url: "/messages",
  //   chatId: currentChat?.id,
  // };

  React.useEffect(() => {
    //if we have  fetched messages
    //add them to the corresponding chat
    setIsLoading(true);
    //if the current chat has no messages fetch them
    //else do nothing
    if (!chatMessages[currentChatId]?.messages.length) {
      contentService
        .getMessages(
          { url: "/messages", chatId: currentChatId },
          chatMessages[currentChatId]?.lastFetched
        )
        .then((messages) => {
          if (messages?.length) {
            const lastFetched = new Date();
            setNewMessages(
              chatMessages[currentChatId]
                ? {
                    messages: [
                      ...chatMessages[currentChatId].messages,
                      ...messages,
                    ],
                    lastFetched,
                  }
                : { messages, lastFetched }
            );
          }
        })
        .catch((err) => setError(err))
        .finally(() => {
          setIsLoading(false);
        });
    }

    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    if (newMessages?.messages?.length) {
      setChatMessages((chatMessages) => ({
        ...chatMessages,
        [currentChatId]: newMessages as {
          messages: Message[];
          lastFetched: Date;
        },
      }));
    }

    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newMessages]);

  React.useEffect(() => {
    if (new Date().getTime() - sentAfter > 60000) {
      const lastFetched = new Date();
      contentService
        .getMessages(
          { url: "/messages", chatId: currentChatId },
          chatMessages[currentChatId]?.lastFetched
        )
        .then((messages) =>
          setNewMessages(
            chatMessages[currentChatId]
              ? {
                  messages: [...chatMessages[currentChatId].messages, ...messages],
                  lastFetched,
                }
              : { messages, lastFetched }
          )
        );
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
