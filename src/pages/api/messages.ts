import clientPromise from "../../../lib/mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import authorize from "./middlewares/authorize";
import authenticate from "./middlewares/authenticate";
import { Collection, ObjectId } from "mongodb";
import { Message } from "@/models";

export default authorize(
  authenticate(async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {
      const client = await clientPromise;
      // const users: Collection<User> = client.db("ichat").collection("users");
      const messages: Collection<Message> = client
        .db("ichat")
        .collection("messages");
      let result;

      try {
        const { chatId } = req.body;

        result = await messages.find({ chat: new ObjectId(chatId) }).toArray();
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
