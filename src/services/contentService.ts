import type { ObjectId } from "mongodb";
import { axiosPrivate } from "../../lib/axios";
import { Message } from "@/models";

class ContentService {
  async getMessages({
    url,
    chatId,
  }: {
    url: string;
    chatId: ObjectId;
  }): Promise<Message[]> {
    // Get the messages
    const messages = await axiosPrivate
      .post<Message[]>(url, { chatId })
      .then((res) => res.data);

    // if (messages) {
    //   // if the isn't a group chat set the name and the chatPicture
    //   // properties of this chat to the name and profile picture
    //   // respectively of the user that is in the chat with the
    //   // app's current user
    //   const normalizedmessages = messages.map(async (chat) => {
    //     if (!chat.group) {
    //       const otherchatId = chat.users.find((id) => id !== chatId);
    //       const result = await userService
    //         .getUser(otherchatId)
    //         .then((otherUser) => ({
    //           ...chat,
    //           name: otherUser.name,
    //           chatPicture: otherUser.profilePicture,
    //         }))
    //         .catch((err) => console.log(err));
    //       return result as Chat;
    //     } else return chat;
    //   });
    //   return await Promise.all(normalizedmessages);
    // }

    return messages;
  }
}

const contentService = new ContentService();
export default contentService;
