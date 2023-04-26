import { UserAuthInfo, User, Chat } from "@/models";
import axios, { axiosPrivate } from "../../lib/axios";

import { validateInputs } from "@/utils/validate";
import type { ObjectId } from "mongodb";

class UserService {
  async login(input: UserAuthInfo): Promise<any> {
    if (!(input.username && input.password))
      return Promise.reject(new Error("Invalid Inputs"));

    const response = axios.post("/auth/login", input);

    return response
      .then(({ data }) => {
        return Promise.resolve();
      })
      .catch((e) => Promise.reject(e.response.data));
  }

  async register(input: UserAuthInfo): Promise<any> {
    const { name, username, password, cPassword } = input;
    //Validate the user input
    try {
      validateInputs(name as string, username, password, cPassword as string);
    } catch (e) {
      return Promise.reject(e);
    }

    const response = axios.post("/auth/register", {
      name,
      username,
      password,
    });

    return response
      .then(({ data }) => data.accessToken)
      .catch((e) => Promise.reject(e.response.data));
  }

  async logout() {
    const { data } = await axios.post("/auth/logout", {});
    return data.accessToken;
  }

  async getUser(param?: string | ObjectId): Promise<Partial<User>> {
    const response = axiosPrivate.get(`/users?param=${param}`);
    return response
      .then(({ data }) => Promise.resolve(data))
      .catch((err) => Promise.reject(err));
  }

  async getChats({
    url,
    userId,
  }: {
    url: string;
    userId: ObjectId;
  }): Promise<Chat[]> {
    console.log("user ID ", userId, "url :", url);
    return axiosPrivate.post(url, { userId }).then((res) => res.data);
  }
}

const userService = new UserService();
export default userService;
