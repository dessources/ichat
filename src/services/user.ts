import UserAuthInFo from "@/models/UserAuthInfo";
import AuthResponse from "@/models/AuthResponse";
import axios, { axiosPrivate } from "../../lib/axios";

import { validateInputs } from "@/utils/validate";
import type { ObjectId } from "mongodb";
import User from "@/models/User";
class UserService {
  async login(input: UserAuthInFo): Promise<string> {
    if (!(input.username && input.password))
      return Promise.reject(new Error("Invalid Inputs"));

    const response = axios.post<AuthResponse>("/auth/login", input);

    return response
      .then(({ data }) => {
        return Promise.resolve(data.accessToken);
      })
      .catch((e) => Promise.reject(e.response.data));
  }

  async register(input: UserAuthInFo): Promise<string> {
    const { name, username, password, cPassword } = input;
    //Validate the user input
    try {
      validateInputs(name as string, username, password, cPassword as string);
    } catch (e) {
      return Promise.reject(e);
    }

    const response = axios.post<AuthResponse>("/auth/register", {
      name,
      username,
      password,
    });

    return response
      .then(({ data }) => data.accessToken)
      .catch((e) => Promise.reject(e.response.data));
  }

  async logout() {
    const { data } = await axios.post<AuthResponse>("/auth/logout", {});
    return data.accessToken;
  }

  async getUser(): Promise<Partial<User>> {
    const response = axiosPrivate.get("/users");
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
  }): Promise<string> {
    return axios.post(url, { userId }).then((res) => res.data);
  }
}

const userService = new UserService();
export default userService;
