import * as mongoDB from "mongodb";
import { normalizeInputs } from "@/utils/normalize";
import { generateAccessToken, generateRefreshToken } from "@/utils/jwt";
import authorize from "../middlewares/authorize";
import { setCookie } from "cookies-next";
import closeDbConnectionOnResolve from "../middlewares/closeDbConnectionOnResolve";
import clientPromise from "@/lib/mongodb";

export default //eslint-disable-next-line react-hooks/rules-of-hooks
closeDbConnectionOnResolve(
  authorize(async (req, res) => {
    if (req.method === "POST") {
      const client = await clientPromise;
      const users: mongoDB.Collection = client.db("ichat").collection("users");
      const data = req.body;

      try {
        const { name, username, password } = await normalizeInputs(
          data.name,
          data.username,
          data.password
        );

        // Generate an access token and a refresh token
        const accessToken = generateAccessToken({ username });
        const refreshToken = generateRefreshToken({ username });

        // Set the access token as a cookie with a short expiration time

        setCookie("accessToken", accessToken, {
          req,
          res,
          httpOnly: true,
          secure: process.env.NODE_ENV === "development",
          path: "/",
          maxAge: 1 * 60 * 60,
        });

        // Set the refresh token as a cookie with a longer expiration time

        setCookie("refreshToken", refreshToken, {
          req,
          res,
          httpOnly: true,
          secure: process.env.NODE_ENV === "development",
          path: "/",
          maxAge: 7 * 24 * 60 * 60,
        });

        return await users
          .insertOne({ ...data, name, username, password })
          .then(() => res.status(201).end())
          .catch((err) => {
            console.log(err);
            res.status(500).json({ message: "Could not register user" });
          });
      } catch (err) {
        process.env.NODE_ENV !== "test" && console.log(err);
        res.status(500).json({ message: "Could not register user" });
      }
    } else {
      res.status(405).json({ message: "Bad Request, only POST accepted" });
    }
  })
);
