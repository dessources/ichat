import UserAuthInFo from "@/models/UserAuthInfo";
import AuthResponse from "@/models/AuthResponse";
import type { AxiosRequestConfig } from "axios";
import axios from "axios";
import { validateInputs } from "@/utils/validate";
class UserService {
  private config: AxiosRequestConfig<any> = {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_UNAUTHENTICATED_USER_TOKEN}`,
    },
  };

  async login({ username, password }: UserAuthInFo): Promise<string | Error> {
    if (!(username && password))
      return Promise.reject(new Error("Invalid Inputs"));

    const response = axios.post<AuthResponse>(
      "/api/auth/login",
      {
        username,
        password,
      },
      this.config
    );

    return response
      .then(({ data }) => data.authToken)
      .catch((e) => Promise.reject(e.response.data));
  }

  async register({
    name,
    username,
    password,
    cPassword,
  }: UserAuthInFo): Promise<string | Error> {
    //Validate the user input
    try {
      validateInputs(name as string, username, password, cPassword as string);
    } catch (e) {
      return Promise.reject(e);
    }

    const response = axios.post<AuthResponse>(
      "/api/auth/register",
      {
        name,
        username,
        password,
      },
      this.config
    );

    return response
      .then(({ data }) => data.authToken)
      .catch((e) => Promise.reject(e.response.data));
  }

  async logout(token: string) {
    const { data } = await axios.post<AuthResponse>("/api/auth/logout", {
      Headers: { Authorization: token },
    });
    return data.authToken;
  }
}

const userService = new UserService();
export default userService;
