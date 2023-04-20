import UserAuthInFo from "@/models/UserAuthInfo";
import AuthResponse from "@/models/AuthResponse";
import type { AxiosRequestConfig } from "axios";
import axios from "../../lib/axios";
import { validateInputs } from "@/utils/validate";
class UserService {
  async login(input: UserAuthInFo): Promise<string | Error> {
    if (!(input.username && input.password))
      return Promise.reject(new Error("Invalid Inputs"));

    const response = axios.post<AuthResponse>("/auth/login", input);

    return response
      .then(({ data }) => data.accessToken)
      .catch((e) => Promise.reject(e.response.data));
  }

  async register(input: UserAuthInFo): Promise<string | Error> {
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

  async logout(token: string) {
    const { data } = await axios.post<AuthResponse>("/auth/logout", {});
    return data.accessToken;
  }
}

const userService = new UserService();
export default userService;
