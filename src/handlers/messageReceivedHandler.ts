import { ChatMessages, Message } from "@/models";

interface messageReceivedHandlerType {
  chatMessages: { [id: string]: { messages: Message[] } };
  setChatMessages: React.Dispatch<React.SetStateAction<ChatMessages | undefined>>;
}

export default function messageReceivedHandler({
  chatMessages,
  setChatMessages,
}: messageReceivedHandlerType) {
  return ({ id, chatId }: { id: string; chatId: string }) => {
    console.log(
      "This message with id " + id + " has been received by the recipient"
    );
    const chat = chatMessages[chatId];

    // console.log(chatId, chat);

    chat.messages[chat.messages.length - 1].status = "delivered";

    setChatMessages((prev: any) => ({ ...prev, [chatId]: chat }));
  };
}
