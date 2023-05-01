import userService from "@/services/userService";

export async function findExistingUsername(username: string) {
  console.log(username);
  const response = userService.getUser(username);
  return await response
    .then(() => {
      console.log(true);
      return true;
    })
    .catch(() => {
      console.log(false);
      return false;
    });
}
