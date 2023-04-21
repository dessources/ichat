import axios from "../../lib/axios";
import User from "@/models/User";
export async function findExistingUsername(username: string) {
  const response = axios.get<Partial<User>>(`/users?username=${username}`);

  return await response.then(({ data }) => true).catch(() => false);
}
