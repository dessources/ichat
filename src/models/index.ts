import { ObjectId, Timestamp } from "mongodb";
// export interface AuthResponse {
//   accessToken: string;
// }

export interface Chat {
  _id: ObjectId;
  name?: string;
  chatPicture?: string;
  users: ObjectId[];
  group: boolean;
}
export interface Message {
  _id: ObjectId;
  sender: ObjectId;
  chat: ObjectId;
  content: string;
  timestamp: string;
}

export interface User {
  _id: ObjectId;
  name: string;
  username: string;
  profilePicture?: string;
  online: boolean;
}
export interface UserAuthInfo {
  username: string;
  password: string;
  cPassword?: string;
  name?: string;
  rememberUser?: boolean;
}

export type Context<T> = [
  T?,
  React.Dispatch<React.SetStateAction<T | undefined>>?
];
