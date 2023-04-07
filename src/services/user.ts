import UserAuthInFo from "@/models/UserAuthInfo";
import User from "../models/User";
import ContentAPIService from "./contentApi";

class UserService {
  async login(input: UserAuthInFo): Promise<User | Error> {
    const response = await ContentAPIService.loginUser(input);

    return response;
  }

  async register({
    name,
    username,
    password,
    cPassword,
  }: UserAuthInFo): Promise<User | Error> {
    if (password === cPassword) {
      const user = await ContentAPIService.registerUser({
        name,
        username,
        password,
      });

      return user;
    } else {
      return Promise.reject("The password and confirm password fields do not match");
    }
  }

  async logout(id: string) {
    const userId: string = await ContentAPIService.logoutUser(id);
    return userId;
  }
}

const userService = new UserService();
export default userService;
