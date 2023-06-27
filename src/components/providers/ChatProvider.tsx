import React from "react";
import useAppContext from "@/hooks/useAppContext";
import { UserContext, ChatContext } from "@/contexts";
import { Context, User, Chat } from "@/models";
import useFetchData from "@/hooks/useFetchData";

import userService from "@/services/userService";
export default function ChatProvider(props: any) {
  const [chats, setChats] = React.useState<Chat[]>([]);
  const [currentChat, setCurrentChat] = React.useState<Chat>();
  const [user] = useAppContext(UserContext) as Context<User>;
  const userId = user?.id as string;

  const {
    data: chatData,
    isError,
    isLoading,
  } = useFetchData<Chat[]>(
    { url: `/chats?userId=${userId}`, userId },
    userService.getChats
  );

  React.useEffect(() => {
    console.log(chatData);
    setChats(chatData);
  }, [chatData]);

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
