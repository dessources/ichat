import { useEffect } from "react";
import useSWR from "swr";

export default function useFetchData<T>(key: any, fetcher: (key: any) => any) {
  const { data, error, isLoading } = useSWR(key, fetcher, {
    revalidateOnMount: true,
  });

  return {
    data,
    isLoading,
    isError: error,
  } as { data: T; isLoading: boolean; isError: boolean };
}
