import UserAuthInFo from "@/models/UserAuthInfo";
import User from "../models/User";
import axios from "axios";
class UserService {
  async login(input: UserAuthInFo): Promise<any | Error> {
    const response = await axios.post("/api/auth/login", input);
    return response;
  }

  async register({
    name,
    username,
    password,
    cPassword,
  }: UserAuthInFo): Promise<any | Error> {
    const passwordValidations = [password === cPassword];
    for (let condition of passwordValidations) {
      if (!condition)
        return Promise.reject(
          "The password and confirm password fields do not match"
        );
    }

    const response = await axios.post("/api/auth/register", {
      name,
      username,
      password,
    });
    return response;
  }

  async logout(token: string) {
    const response = axios.post("/api/auth/logout", {
      Headers: { Authorization: token },
    });
    return response;
  }
}

const userService = new UserService();
export default userService;
