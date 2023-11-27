import { Chat, ChatMessages, ChatWithInterlocutor, Message, User } from "@/models";
import type { Socket } from "socket.io-client";

interface newMessageHandlerType {
  chatMessages: { [id: string]: { messages: Message[] } };
  setChatMessages: React.Dispatch<React.SetStateAction<ChatMessages | undefined>>;
  setChats: React.Dispatch<
    React.SetStateAction<{ [id: string]: ChatWithInterlocutor }>
  >;
  socket?: Socket;
  currentChat?: ChatWithInterlocutor;
  user: User;
}

export default function newMessageHandler({
  chatMessages,
  setChatMessages,
  setChats,
  socket,
  currentChat,
  user,
}: newMessageHandlerType) {
  return (message: Message & { recipients: string[] }) => {
    console.log(`Message ${message.content} has been received`);
    const newMessages = chatMessages[message.chat]
      ? {
          ...chatMessages[message.chat],
          messages: [...chatMessages[message.chat].messages, message],
        }
      : { messages: [message] };

    setChatMessages?.((chatMessages: any) => ({
      ...chatMessages,
      [message.chat]: newMessages,
    }));

    // console.log("the chats are", chats);
    // console.log("the chat Messages are", chatMessages);

    //If the message is sent to a group chat, use that chat's id to reference
    // the chat. Else, if the sender's id is different from the current user's id
    // choose the id of the sender to reference the corresponding chat.
    //Else, if this client is also the sender, meaning if it is another device
    //on which the sender of the message is also currently logged in, we find
    // the id that is not that of the current user from the recipients's list and
    // use it to reference the corresponding chat.
    const chatId = message.group
      ? message.chat
      : message.sender !== user.id
      ? message.sender
      : (message.recipients.find((el) => el !== user.id) as string);

    setChats((prev: any) => {
      const chat = structuredClone(prev[chatId]);
      delete prev[chatId];
      chat.unreadMessageCount = chat.unreadMessageCount as number;
      chat.id !== currentChat?.id && chat.unreadMessageCount++;
      return {
        [chatId]: chat,
        ...prev,
      };
    });

    setTimeout(() => {
      socket?.emit("message-received", {
        id: message.id,
        chatId: message.chat,
        sender: message.sender,
      });
    }, 3000);

    if (message.chat === currentChat?.id) {
      setTimeout(() => {
        socket?.emit("messages-read", {
          messageIds: [message.id],
          chatId: message.chat,
          sender: message.sender,
        });
      }, 6000);
    }
  };
}
