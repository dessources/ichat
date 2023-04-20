import React from "react";
import axios, { axiosPrivate } from "../../lib/axios";
import { setCookie } from "cookies-next";
// Wrapper that will retry any request that failed
//because of an expired accessToken with a new
// accessToken

function useAxiosPrivate() {
  React.useEffect(() => {
    const responseIntercept = axiosPrivate.interceptors.response.use(
      (response) => response,
      async (error) => {
        console.log("An error happened: ", error.response.data.message);

        const prevRequest = error?.config;

        if ([403, 401].includes(error?.response?.status) && !prevRequest?.sent) {
          console.log("Getting new access token");
          prevRequest.sent = true;
          const { data } = await axios.post("/auth/refresh");
          console.log("prevRequest", prevRequest);
          setCookie("accessToken", prevRequest);
          // prevRequest.setHeader(
          //   "Set-Cookie",
          //   `accessToken=${data.accessToken}; HttpOnly`
          // );
          return axiosPrivate(prevRequest);
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosPrivate.interceptors.response.eject(responseIntercept);
    };
  }, []);
  return axiosPrivate;
}

export default useAxiosPrivate;
