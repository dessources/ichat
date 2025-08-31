import * as mongoDB from "mongodb";
import { normalizeInputs } from "@/utils/normalize";
import { generateAccessToken, generateRefreshToken } from "@/utils/jwt";
import { v4 as uuid4 } from "uuid";
import authorize from "../middlewares/authorize";
import allowMethods from "../middlewares/allowMethods";
import { setCookie } from "cookies-next";
import clientPromise from "@/lib/mongodb";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const client = await clientPromise;

  const users: mongoDB.Collection = client.db("ichat").collection("users");
  const data = req.body;

  try {
    const { name, username, password } = await normalizeInputs(
      data.name,
      data.username,
      data.password
    );

    const newUser = {
      ...data,
      id: uuid4(),
      about: data.about ?? "Hey there! I'm on Ichat!",
      name,
      username,
      password,
    };

    // Generate an access token and a refresh token
    const accessToken = generateAccessToken({ username });
    const refreshToken = generateRefreshToken({ username });

    // Set the access token as a cookie with a short expiration time

    await setCookie("accessToken", accessToken, {
      req,
      res,
      httpOnly: true,
      secure: process.env.NODE_ENV === "development",
      path: "/",
      maxAge: 1 * 60 * 60,
    });

    // Set the refresh token as a cookie with a longer expiration time

    await setCookie("refreshToken", refreshToken, {
      req,
      res,
      httpOnly: true,
      secure: process.env.NODE_ENV === "development",
      path: "/",
      maxAge: 7 * 24 * 60 * 60,
    });

    return await users
      .insertOne(newUser)
      .then(() => res.status(201).end())
      .catch(async (err) => {
        process.env.NODE_ENV !== "production" &&
          console.dir(err, { depth: null });
        res.status(500).json({ message: "Could not register user" });
      });
  } catch (err) {
    process.env.NODE_ENV !== "test" && console.log(err);
    res.status(500).json({ message: "Could not register user" });
  }
};

export default allowMethods(["POST"], authorize(handler));
