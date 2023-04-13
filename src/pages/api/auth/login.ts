import clientPromise from "../../../../lib/mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import * as mongoDB from "mongodb";
import { compare } from "bcrypt";
import { generateToken, verifyToken } from "@/utils/jwt";
import { authenticate } from "../middlewares/authenticate";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  authenticate(req, res, async () => {
    if (req.method === "POST") {
      const client = await clientPromise;
      const users: mongoDB.Collection = client.db("ichat").collection("users");
      const data = req.body;

      const user = await users.findOne({ username: data.username.toLowerCase() });

      const passwordsMatch = user
        ? await compare(data.password, user?.password)
        : null;

      if (user && passwordsMatch) {
        const claims = { username: user.username };
        const authToken = generateToken(claims);
        users.updateOne({ _id: user._id }, { $set: { online: true } });

        res.status(200).json({ message: "Login successful", authToken });
      } else {
        res.status(401).json({ message: "Could not login user" });
      }
    } else {
      res.status(405).json({ message: "Bad Request, only POST accepted" });
    }
  });
}
