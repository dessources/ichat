import clientPromise from "../../../lib/mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import { authenticate } from "./middlewares/authenticate";
import * as mongoDB from "mongodb";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  authenticate(req, res, async () => {
    if (req.method === "GET") {
      const client = await clientPromise;
      const users: mongoDB.Collection = client.db("ichat").collection("users");
      const { username } = req.query;

      if (req.body.username === "unauthenticated_user") {
        const user =
          typeof username === "string"
            ? await users.findOne({ username: username.toLowerCase() })
            : null;

        const result = user ? true : false;

        res.json({ result });
      } else {
        res.status(200);
        //Someting else
      }
    }
  });
}
