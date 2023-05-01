import useSWR from "swr";
import contentService from "@/services/contentService";
import type { ObjectId } from "mongodb";

export default function useMessages(chatId: ObjectId) {
  const fetcher = contentService.getMessages;
  const { data, error, isLoading } = useSWR({ url: `/messages`, chatId }, fetcher);

  return {
    messages: data,
    isLoading,
    isError: error,
  };
}
