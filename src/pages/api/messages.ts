import clientPromise from "../../../lib/mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import authorize from "./middlewares/authorize";
import authenticate from "./middlewares/authenticate";
import allowMethods from "./middlewares/allowMethods";
import { Collection } from "mongodb";
import { Message } from "@/models";
import { getCookies } from "cookies-next";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const client = await clientPromise;
  const messages: Collection<Message> = client
    .db("ichat")
    .collection("test_messages");

  switch (req.method) {
    //Getting messages
    case "GET":
      let result: Message[];

      try {
        const { chatId, sentAfter } = req.query;
        //Get all messages sent in the corresponding chat after the sentAfter
        //Date
        result = await messages
          .find({
            $and: [
              { chat: chatId },
              { timestamp: { $gte: new Date(<string>sentAfter) } },
            ],
          })
          .toArray();

        return res.status(200).json(result);
      } catch (err) {
        process.env.NODE_ENV !== "production" && console.log(err);
        res.status(500).json({ message: "Something went wrong", error: err });
      }

      break;
    // Saving a message
    case "POST":
      const { message } = req.body;
      //set the timestamp back to a date object
      message.timestamp = new Date(message.timestamp);
      try {
        messages.insertOne(message);
      } catch (err) {
        process.env.NODE_ENV !== "production" && console.log(err);
        res.status(500).json({ message: "Something went wrong", error: err });
      }
      res.json("saved message!");
  }
}

export default allowMethods(["GET", "POST"], authenticate(authorize(handler)));
