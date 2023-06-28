.props}
    />
  );
}
=======
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
 );.usData]);eEffect(() 
=>return;(

   <ChatContext.Provider
      value={{
        chat ,
        s }, [chaats,
    currentchat,
    setCurrentChat,
    isLoading,
    isError
  }}
       Data]}  Data]}}
alues       />text.ProvierropCh);
}
Provier
  8edc6a1be93c4f9       isLoading,
      e01d8e2c9a65674c3de8edc6a1be93c4f9
