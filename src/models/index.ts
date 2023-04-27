<<<<<<< HEAD
import { SxProps, Theme } from "@mui/material";
=======
>>>>>>> c62a910a1b6c068893e007a074114ebdc69fdf09
import { ObjectId } from "mongodb";
// export interface AuthResponse {
//   accessToken: string;
// }

export interface Chat {
  name?: string;
  chatPicture?: string;
  users: ObjectId[];
<<<<<<< HEAD
  group: boolean;
=======
>>>>>>> c62a910a1b6c068893e007a074114ebdc69fdf09
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
<<<<<<< HEAD

export type ComponentStyle = React.CSSProperties | SxProps<Theme>;
=======
export interface ComponentStyle {
  [className: string]: React.CSSProperties;
}
>>>>>>> c62a910a1b6c068893e007a074114ebdc69fdf09
