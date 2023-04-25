import User from "./User";

type UserContextType = {
  user: User | undefined;
  setUser: Function;
} | null;

export default UserContextType;
