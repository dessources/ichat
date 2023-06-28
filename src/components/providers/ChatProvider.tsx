import React from "react";

import { Chat } from "@/models";
import useFetchData from "@/hooks/useFetchData";
import userService from "@/services/userService";
import { ChatContext } from "@/contexts";

export default function ChatProvider(props: any) {
  const [chats, setChats] = React.useState<Chat[]>([]);
  const [currentChat, setCurrentChat] = React.useState<Chat>();

  const { data, isError, isLoading } = useFetchData<Chat[]>(
    { url: "/chats", id: currentChat?.id },
    userService.getChats
  );

  React.useEffect(() => {
    setChats(data);
  }, [data]);

  return (
    <ChatContext.Provider
      value={{
        chats,
        setChats,
        currentChat,
        setCurrentChat,
        isError,
        isLoading,
      }}
      {...props}
    />
  );
}
