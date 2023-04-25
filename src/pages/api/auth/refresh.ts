import { verifyRefreshToken, generateAccessToken } from "@/utils/jwt";
import { NextApiRequest, NextApiResponse } from "next";
import { getCookie, setCookie } from "cookies-next";
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const refreshToken = getCookie("refreshToken", { req, res });

    try {
      // Verify the refresh token
      const { username } = verifyRefreshToken(<string>refreshToken) as {
        username: string;
      };

      if (!username) {
        throw new Error();
      }

      // Generate a new access token
      const accessToken = generateAccessToken({ username });

      // Set the new access token as a cookie with a short expiration time
      setCookie(`accessToken`, accessToken, {
        req,
        res,
        httpOnly: true,
        path: "/",
        maxAge: 1 * 60 * 60,
      });

      // Return the new access token in the response
      return res.status(200);
    } catch (err) {
      process.env.NODE_ENV === "test" && console.log(err);
      res.status(401).json({ message: "Authentication failed" });
    }
  } else {
    return res.status(405).json({ message: "Method not allowed" });
  }
}
