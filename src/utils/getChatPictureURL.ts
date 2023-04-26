import { Chat, User } from "@/models";
import userService from "@/services/user";

export default async function getChatPictureURL(chat: Chat, user: User) {
  if (chat.chatPicture) return chat.chatPicture;
  else {
    const receiver = chat.users.find((userId) => userId !== user.id);
    return await userService.getUser(receiver).then((data) => data.profilePicture);
  }
}
