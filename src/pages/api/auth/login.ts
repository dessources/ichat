import clientPromise from "../../../../lib/mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import { getCookie } from "cookies-next";
import * as mongoDB from "mongodb";
import { compare } from "bcrypt";

import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from "@/utils/jwt";

import authorize from "../middlewares/authorize";
import {
  LONG_REFRESH_TOKEN_DAYS_COUNT,
  SHORT_REFRESH_TOKEN_DAYS_COUNT,
} from "@/utils/constants";

export default authorize(async (req, res) => {
  if (req.method === "POST") {
    const refreshToken = getCookie("refreshToken", { req, res });

    //Try login in with the refresh token
    if (refreshToken) {
      // Verify the refresh token
      try {
        const { username } = verifyRefreshToken(<string>refreshToken) as {
          username: string;
        };

        // Generate a new access token
        const accessToken = generateAccessToken({ username });

        // Set a cookie with the new access token
        res.setHeader(
          "Set-Cookie",
          `accessToken=${accessToken}; HttpOnly; Path=/; Max-Age=${1 * 60 * 60}`
        );
        return res.status(200).json({ accessToken });
      } catch (err) {
        console.log(err);
        // Refresh token is invalid or has expired
        return res.status(401).json({ message: "Unauthorized" });
      }
    } else {
      const client = await clientPromise;
      const users: mongoDB.Collection = client.db("ichat").collection("users");
      const data = req.body;
      const username = data?.username;
      const user = await users.findOne({ username: username });

      const passwordsMatch = user
        ? await compare(data.password, user?.password)
        : null;

      if (user && passwordsMatch) {
        users.updateOne({ _id: user._id }, { $set: { online: true } });

        // Generate an access token and a refresh token
        const accessToken = generateAccessToken({ username });
        const refreshToken = generateRefreshToken({ username });
        const refreshTokenDuration =
          (data.rememberUser
            ? LONG_REFRESH_TOKEN_DAYS_COUNT
            : SHORT_REFRESH_TOKEN_DAYS_COUNT) * 86_400;

        // Set the access token as a cookie with a short expiration time
        res.setHeader(
          "Set-Cookie",
          `accessToken=${accessToken}; HttpOnly; Path=/; Max-Age=${1 * 60 * 60}`
        );

        // Set the refresh token as a cookie with a longer expiration time
        res.setHeader(
          "Set-Cookie",
          `refreshToken=${refreshToken}; HttpOnly; Path=/; Max-Age=${refreshTokenDuration}`
        );

        // Return the access token in the response
        return res.status(200).json({ accessToken });
      } else {
        res.status(401).json({ message: "Could not login user" });
      }
    }
  } else {
    res.status(405).json({ message: "Bad Request, only POST accepted" });
  }
});
