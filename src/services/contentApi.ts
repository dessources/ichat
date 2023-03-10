import User from "@/models/User";
import { GraphQLClient } from "graphql-request";
// const GraphQLClient = require("graphql-request").GraphQLClient;

const readOnlyClient = new GraphQLClient(
  `${process.env.NEXT_PUBLIC_READONLY_CONTENT_API_URL}`
);
const client = new GraphQLClient(
  `${process.env.NEXT_PUBLIC_CONTENT_API_URL}`
);

class ContentAPIService {
  async getUsers() {
    return "users";
  }
}

const contentAPI = new ContentAPIService();
export default contentAPI;
