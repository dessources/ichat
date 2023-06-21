// export interface AuthResponse {
//   accessToken: string;
// }

export interface Chat {
  id: string;
  name?: string;
  chatPicture?: string;
  users: string[];
  group: boolean;
}

export interface Message {
  id: string;
  sender: string;
  chat: string;
  content: string;
  timestamp: Date;
}

export interface ChatMessages {
  [chat: string]: { messages: Message[]; lastFetched?: Date };
}

export interface User {
  id: string;
  name: string;
  username: string;
  profilePicture?: string;
  online: boolean;
  about: string;
}

export interface ChatUsers {
  [user: string]: User[];
}
export interface UserAuthInfo {
  username: string;
  password: string;
  cPassword?: string;
  name?: string;
  rememberUser?: boolean;
}

export type ChatContext = {
  chats: Chat[];
  setChats: React.Dispatch<React.SetStateAction<Chat[]>>;
  currentChat: Chat | undefined;
  setCurrentChat: React.Dispatch<React.SetStateAction<Chat | undefined>>;
  isLoading: boolean;
  isError: boolean;
};

export type ChatMessagesContext = {
  chatMessages: ChatMessages;
  setChatMessages: React.Dispatch<
    React.SetStateAction<ChatMessages | undefined>
  >;
  isLoading: boolean;
  error: any;
};

export type Context<T> =
  | [T?, React.Dispatch<React.SetStateAction<T | undefined>>?];
