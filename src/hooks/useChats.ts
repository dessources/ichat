import useSWR from "swr";
import userService from "@/services/user";
import type { ObjectId } from "mongodb";

export default function useChats(userId: ObjectId) {
  const fetcher = userService.getChats;
  const { data, error, isLoading } = useSWR({ url: `/chats`, userId }, fetcher);

  return {
    chats: data,
    isLoading,
    isError: error,
  };
}
