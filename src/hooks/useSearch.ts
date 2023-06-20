import React from "react";
import { axiosPrivate } from "@/lib/axios";

//models
import { User } from "@/models";

function useSearch(username: string) {
  const [searchResults, setSearchResults] = React.useState<User[]>([]);

  React.useEffect(() => {
    if (username)
      axiosPrivate
        .post(`/search/users/${username}`)
        .then(({ data }) => setSearchResults(data));
  }, [username]);
  return { searchResults };
}

export default useSearch;
