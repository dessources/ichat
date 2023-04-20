import { BASE_URL, AXIOS_CONFIG } from "@/utils/constants";
import axios from "axios";

export default axios.create({
  baseURL: BASE_URL,
  headers: AXIOS_CONFIG.headers,
});

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: AXIOS_CONFIG.headers,
  withCredentials: true,
});
