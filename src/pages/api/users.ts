import clientPromise from "../../../lib/mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import authorize from "./middlewares/authorize";
import * as mongoDB from "mongodb";
import User from "@/models/User";

export default authorize(async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  return res
    .status(200)
    .json({ message: "what now ?", username: req.query.username });
  // if (req.method === "GET") {
  //   const client = await clientPromise;
  //   const users: mongoDB.Collection<User> = client.db("ichat").collection("users");
  //   const { username } = req.query;

  //   const user =
  //     typeof username === "string"
  //       ? await users.findOne({ username: username.toLowerCase() })
  //       : null;

  //   if (!user) {
  //     return res.status(404).json({ message: "User not found" });
  //   }
  //   const { name, profilePicture } = user;
  //   const result = { name, profilePicture };
  //   return res.status(200).json(result);
  // }
});
