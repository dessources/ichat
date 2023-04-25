import AuthResponse from "@/models/AuthResponse";
import axios from "../../lib/axios";
export default async function autoLogin() {
  return axios.post<AuthResponse>("/auth/login");
}
