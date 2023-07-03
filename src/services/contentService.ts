import { axiosPrivate } from "../../lib/axios";
import { Message, User, Chat } from "@/models";
import { v4 as uuid4 } from "uuid";
interface key {
  url: string;
  chatId: string;
}

interface CreateChatData {
  users: User[];
  name?: string;
  chatPicture?: string;
  currentUserId: string;
}
class ContentService {
  async getMessages(
    { url, chatId }: key,
    sentAfter = new Date(0)
  ): Promise<Message[]> {
    // Get the messages
    const messages = await axiosPrivate
      .get<Message[]>(
        `${url}?chatId=${chatId}&sentAfter=${sentAfter.toISOString()}`
      )
      .then((res) => res.data);

    return messages;
  }

  async createNewChat(data: CreateChatData, isGroup: boolean) {
    let chat: Required<Chat> & { interlocutorId: string };
    const id = uuid4();
    const users = data.users.map((user) => user.id);

    chat = {
      id: id,
      users: [...users, data.currentUserId],
      group: isGroup,
      chatPicture: data.chatPicture || "",
      name: data.name || "",
      interlocutorId: !isGroup ? users[0] : "",
    };

    const result = axiosPrivate.post("/chats", { data: chat });
    return result
      .then(({ data }) => data)
      .catch((e) => {
        //TODO handle errors
      });
  }
}

const contentService = new ContentService();
export default contentService;
