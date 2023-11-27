import clientPromise from "../../../lib/mongodb";
import { NextApiRequest, NextApiResponse } from "next";

import authorize from "./middlewares/authorize";
import authenticate from "./middlewares/authenticate";
import allowMethods from "./middlewares/allowMethods";

import { Collection } from "mongodb";
import { Chat, User } from "@/models";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const client = await clientPromise;
  const chats: Collection<Omit<Chat, "unreadMessageCount">> = client
    .db("ichat")
    .collection("chats");
  const testChats: Collection<Omit<Chat, "unreadMessageCount">> = client
    .db("ichat")
    .collection("test_chats");
  const users: Collection<User> = client.db("ichat").collection("users");

  switch (req.method) {
    case "GET":
      let result;

      try {
        const { userId } = req.query as { userId: string };

        result = await chats.find({ users: { $in: [userId] } }).toArray();
        result.push(
          ...(await testChats.find({ users: { $in: [userId] } }).toArray())
        );
        return res.status(200).json(result);
      } catch (err) {
        process.env.NODE_ENV !== "production" && console.log(err);
        res.status(500).json({ message: "Something went wrong", error: err });
      }

      break;
    case "PUT":
      try {
        const chatId: string = req.body.chat.id;
        await chats.findOneAndReplace({ id: chatId }, req.body.chat);
        res.status(201).json({ message: "Chat saved" });
      } catch (e) {
        process.env.NODE_ENV !== "production" && console.log(e);
        res.status(500).json({ message: "Could not save chat" });
      }
      break;
    case "POST":
      try {
        const chat = req.body.data;

        console.log(chat);
        const { users: chatUsers, name: chatName, group, id } = chat;
        testChats.insertOne({
          users: chatUsers,
          name: chatName,
          group,
          id,
        });

        //if the chat is not a group chat find the other user that
        //the current user wants to communicate with
        const interlocutor =
          !chat.group &&
          ((await users.findOne({
            id: chat.interlocutorId,
          })) as User);

        const { name, profilePicture: chatPicture } = !chat.group
          ? (interlocutor as User)
          : chat;

        res.status(200).json({ ...chat, name, chatPicture });
      } catch (e) {
        process.env.NODE_ENV !== "production" && console.log(e);
        res.status(500).json({ message: "Could not save chat" });
      }

      break;
    default:
      res.status(500).json({ message: "Could not save chat" });
      process.env.NODE_ENV !== "production" &&
        console.log("Error in switch block");
  }
}

export default allowMethods(
  ["GET", "POST", "PUT"],
  authenticate(authorize(handler))
);
