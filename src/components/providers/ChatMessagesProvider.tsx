import React from "react";

//models
import { ChatMessages, Message, ChatContext as ChatContextType } from "@/models";
import useAppContext from "@/hooks/useAppContext";
import { ChatContext, ChatMessagesContext } from "@/contexts";
import contentService from "@/services/contentService";

function ChatMessagesProvider(props: any) {
  const { currentChat } = useAppContext(ChatContext) as ChatContextType;

  const currentChatId = currentChat?.id as string;
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState();
  // const [newMessages, setNewMessages] = React.useState<
  //   { messages: Message[] } | undefined
  // >();
  const [chatMessages, setChatMessages] = React.useState<ChatMessages>({});

  React.useEffect(() => {
    if (currentChatId) {
      //if we have  fetched messages
      //add them to the corresponding chat
      setIsLoading(true);
      //if the current chat has no messages fetch them
      //else do nothing
      const currentMessages = chatMessages[currentChatId]?.messages;
      if (!currentMessages?.length) {
        contentService
          .getMessages(currentChatId)
          .then((messages) => {
            if (messages?.length) {
              setChatMessages((chatMessages) => ({
                ...chatMessages,
                [currentChatId]: { messages },
              }));
            }
          })
          .catch((err) => setError(err))
          .finally(() => {
            setIsLoading(false);
          });
      } else {
        const lastChatId = currentMessages[currentMessages.length - 1].id;
        contentService
          .getMessages(currentChatId, lastChatId)
          .then((messages) => {
            if (messages?.length) {
              setChatMessages((chatMessages) => ({
                ...chatMessages,
                [currentChatId]: { messages: [...currentMessages, ...messages] },
              }));
            }
          })
          .catch((err) => setError(err))
          .finally(() => {
            setIsLoading(false);
          });
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
