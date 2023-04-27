import { SxProps, Theme } from "@mui/material";
import { ObjectId } from "mongodb";
// export interface AuthResponse {
//   accessToken: string;
// }

export interface Chat {
  name?: string;
  chatPicture?: string;
  users: ObjectId[];
  group: boolean;
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

export type ComponentStyle = React.CSSProperties | SxProps<Theme>;
