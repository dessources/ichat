import userService from "@/services/userService";

export async function findExistingUsername(username: string) {
  const response = userService.getUser(username);
  return await response.then(() => true).catch(() => false);
}
