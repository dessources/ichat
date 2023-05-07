import clientPromise from "../../../lib/mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import authorize from "./middlewares/authorize";

import { Collection } from "mongodb";
import { User } from "@/models";
import { getCookie } from "cookies-next";
import { verifyAccessToken } from "@/utils/jwt";

export default authorize(async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const client = await clientPromise;
    const users: Collection<User> = client.db("ichat").collection("users");
    const param = req.query.param;
    let user;
    try {
      //try to get a user with param being a username or an id
      // and query the database accordingly
      if (param && param !== "undefined") {
        user =
          (await users.findOne({ id: <string>param })) ??
          (await users
            .find({ username: param })
            .collation({ locale: "en", strength: 2 })
            .toArray()
            .then((arr) => arr[0]));
      } else {
        //if we didn't find a user then,
        //return the user whose access token is in the access token cookie
        const accessToken = getCookie("accessToken", { req, res });

        if (accessToken) {
          const { username } = verifyAccessToken(accessToken as string) as {
            username: string;
          };

          user = await users
            .find({ username: username })
            .collation({ locale: "en", strength: 2 })
            .toArray()
            .then((arr) => arr[0]);
        }
      }
    } catch (err) {
      process.env.NODE_ENV === "test" && console.log(err);
      res.status(500).json({ message: "Something went wrong", error: err });
    }

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const { name, profilePicture, id, username } = user;
    const result = { name, profilePicture, id, username };
    return res.status(200).json(result);
  } else {
    res.status(405).json({ message: "Bad request" });
  }
});
