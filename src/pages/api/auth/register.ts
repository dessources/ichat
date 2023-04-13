import clientPromise from "../../../../lib/mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import * as mongoDB from "mongodb";
import { normalizeInputs } from "@/utils/normalize";
import { generateToken } from "@/utils/jwt";
import { authenticate } from "../middlewares/authenticate";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  authenticate(req, res, async () => {
    if (req.method === "POST") {
      const client = await clientPromise;
      const users: mongoDB.Collection = client.db("ichat").collection("users");
      const data = req.body;

      const { name, username, password } = await normalizeInputs(
        data.name,
        data.username,
        data.password
      );

      const claims = { username };
      const authToken = generateToken(claims);

      await users
        .insertOne({ ...data, name, username, password })
        .then(() => res.status(200).json({ authToken }))
        .catch(() => res.status(400).json({ message: "Could not register user" }));
    } else {
      res.status(405).json({ message: "Bad Request, only POST accepted" });
    }
  });
}
