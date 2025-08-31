import clientPromise from "../../../lib/mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import authorize from "./middlewares/authorize";
import authenticate from "./middlewares/authenticate";
import { Collection } from "mongodb";
import { Chat } from "@/models";
import allowMethods from "./middlewares/allowMethods";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const client = await clientPromise;
  const chats: Collection<Chat> = client.db("ichat").collection("chats");
  if (req.method === "GET") {
    let result;

    try {
      const { userId } = req.query as { userId: string };
      console.log(userId);
      result = await chats.find({ users: { $in: [userId] } }).toArray();
    } catch (err) {
      process.env.NODE_ENV !== "production" && console.log(err);
      res.status(500).json({ message: "Something went wrong", error: err });
    }

    return res.status(200).json(result);
  } else {
    try {
      const chatId: string = req.body.chat.id;
      const chat = await chats.findOneAndReplace({ id: chatId }, req.body.chat);
      res.status(201).json({ message: "Chat saved" });
    } catch (e) {
      process.env.NODE_ENV !== "production" && console.log(e);
      res.status(500).json({ message: "Could not save chat" });
    }
  }
}

export default allowMethods(["GET", "POST"], authenticate(authorize(handler)));
