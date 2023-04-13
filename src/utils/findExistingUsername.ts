import get from "axios";

export async function findExistingUsername(username: string) {
  const { data } = await get(`/api/users?username=${username}`, {
    headers: {
      Authorization: `bearer ${process.env.NEXT_PUBLIC_UNAUTHENTICATED_USER_TOKEN}`,
    },
  });

  return data.result ? true : false;
}
