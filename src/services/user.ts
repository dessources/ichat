import User from "../models/User";
import ContentAPIService from "./contentApi";

class UserService {
  async login() {
    console.log("logged in");
  }

  async register() {
    console.log("register");
  }

  async logout() {
    console.log("logged out");
  }
}

const userService = new UserService();
export default userService;
