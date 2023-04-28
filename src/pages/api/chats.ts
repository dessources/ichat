import clientPromise from "../../../lib/mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import authorize from "./middlewares/authorize";
import authenticate from "./middlewares/authenticate";
import { Collection, ObjectId } from "mongodb";
import { Chat } from "@/models";

export default authenticate(
  authorize(async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {
      const client = await clientPromise;
      // const users: Collection<User> = client.db("ichat").collection("users");
      const chats: Collection<Chat> = client.db("ichat").collection("chats");
      let result;

      try {
        const { userId } = req.body;

        result = await chats
          .find({ users: { $in: [new ObjectId(userId)] } })
          .toArray();
      } catch (err) {
        process.env.NODE_ENV !== "production" && console.log(err);
        res.status(500).json({ message: "Something went wrong", error: err });
      }

      return res.status(200).json(result);
    } else {
      res.status(405).json({ message: "Bad request" });
    }
  })
);
