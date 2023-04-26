import { ObjectId } from "mongodb";
// export interface AuthResponse {
//   accessToken: string;
// }

export interface Chat {
  name?: string;
  chatPicture?: string;
  users: ObjectId[];
}

export interface User {
  id: ObjectId;
  name: string;
  username: string;
  password: string;
  profilePicture: string;
  online: boolean;
}
export interface UserAuthInfo {
  username: string;
  password: string;
  cPassword?: string;
  name?: string;
  rememberUser?: boolean;
}

export type UserContextType = {
  user: User | undefined;
  setUser: Function;
} | null;

// export type { UserContextType };
export type AuthContextType = {
  auth: boolean;
  setAuth: Function;
} | null;
export interface ComponentStyle {
  [className: string]: React.CSSProperties;
}
