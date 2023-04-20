import type { AxiosRequestConfig } from "axios";

export const MIN_PASSWORD_LENGTH = 8;
export const MAX_USERNAME_LENGTH = 21;
export const MIN_USERNAME_LENGTH = 3;
export const MAX_NAME_LENGTH = 50;
export const MIN_NAME_LENGTH = 2;
export const SALT_ROUNDS = 10;
export const LONG_REFRESH_TOKEN_DAYS_COUNT = 30;
export const SHORT_REFRESH_TOKEN_DAYS_COUNT = 1;
export const BASE_URL = "/api";
export const AXIOS_CONFIG: AxiosRequestConfig = {
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_ACCESS_TOKEN}`,
  },
};
