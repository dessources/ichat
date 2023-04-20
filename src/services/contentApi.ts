import User from "@/models/User";
import UserAuthInFo from "@/models/UserAuthInfo";
import { GraphQLClient, gql } from "graphql-request";
// const GraphQLClient = require("graphql-request").GraphQLClient;

const readOnlyClient = new GraphQLClient(
  `${process.env.NEXT_PUBLIC_READONLY_CONTENT_API_URL}`,
  {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_CONTENT_API_TOKEN}`,
    },
  }
);
const client = new GraphQLClient(`${process.env.NEXT_PUBLIC_CONTENT_API_URL}`, {
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_CONTENT_API_TOKEN}`,
  },
});

class ContentAPIService {}

const contentAPI = new ContentAPIService();
export default contentAPI;
