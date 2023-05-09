import clientPromise from "../../../lib/mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import authorize from "./middlewares/authorize";
import authenticate from "./middlewares/authenticate";
import { Collection } from "mongodb";
import { Message } from "@/models";
import { sent } from "@/styles/Chat.style";
// import { v4 } from "uuid";

export default authenticate(
  authorize(async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {
      const client = await clientPromise;

      const messages: Collection<Message> = client
        .db("ichat")
        .collection("messages");
      let result: Message[];

      try {
        const { chatId, sentAfter } = req.body;

        result = await messages
          .find({
            $and: [{ chat: chatId }, { timestamp: { $gte: new Date(sentAfter) } }],
          })
          .toArray();

        return res.status(200).json(result);
      } catch (err) {
        process.env.NODE_ENV !== "production" && console.log(err);
        res.status(500).json({ message: "Something went wrong", error: err });
      }
    } else {
      res.status(405).json({ message: "Bad request" });
    }
  })
);
