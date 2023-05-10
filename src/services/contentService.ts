import { axiosPrivate } from "../../lib/axios";
import { Message } from "@/models";

interface key {
  url: string;
  chatId: string;
}

class ContentService {
  async getMessages(
    { url, chatId }: key,
    sentAfter = new Date(0)
  ): Promise<Message[]> {
    // Get the messages
    const messages = await axiosPrivate
      .post<Message[]>(url, { chatId, sentAfter })
      .then((res) => res.data);

    return messages;
  }
}

const contentService = new ContentService();
export default contentService;
