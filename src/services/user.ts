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
  }: UserAuthInFo): Promise<String | Error> {
    if (password === cPassword) {
      const userId = await ContentAPIService.registerUser({
        name,
        username,
        password,
      });

      return userId;
    } else {
      return Promise.reject("Could not register the user.");
    }
  }

  async logout(id: string) {
    const userId: string = await ContentAPIService.logoutUser(id);
    return userId;
  }
}

const userService = new UserService();
export default userService;
