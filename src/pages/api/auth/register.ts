import clientPromise from "../../../../lib/mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import * as mongoDB from "mongodb";
import { normalizeInputs } from "@/utils/normalize";
import { generateAccessToken, generateRefreshToken } from "@/utils/jwt";
import authorize from "../middlewares/authorize";

export default authorize(async (req, res) => {
  if (req.method === "POST") {
    const client = await clientPromise;
    const users: mongoDB.Collection = client.db("ichat").collection("users");
    const data = req.body;

    const { name, username, password } = await normalizeInputs(
      data.name,
      data.username,
      data.password
    );

    // Generate an access token and a refresh token
    const accessToken = generateAccessToken({ username });
    const refreshToken = generateRefreshToken({ username });

    // Set the access token as a cookie with a short expiration time
    res.setHeader(
      "Set-Cookie",
      `accessToken=${accessToken}; HttpOnly; Path=/; Max-Age=${1 * 60 * 60}`
    );

    // Set the refresh token as a cookie with a longer expiration time
    res.setHeader(
      "Set-Cookie",
      `refreshToken=${refreshToken}; HttpOnly; Path=/; Max-Age=${7 * 24 * 60 * 60}`
    );

    return await users
      .insertOne({ ...data, name, username, password })
      .then(() => res.status(200).json({ accessToken }))
      .catch(() => res.status(400).json({ message: "Could not register user" }));
  } else {
    res.status(405).json({ message: "Bad Request, only POST accepted" });
  }
});
