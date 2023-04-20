import { verifyRefreshToken, generateAccessToken } from "@/utils/jwt";
import { NextApiRequest, NextApiResponse } from "next";
import { getCookie } from "cookies-next";
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const refreshToken = getCookie("refreshToken", { req, res });

    // Verify the refresh token
    const { username } = verifyRefreshToken(<string>refreshToken) as {
      username: string;
    };

    if (!username) {
      return res.status(401).json({ message: "Invalid refresh token" });
    }

    // Generate a new access token
    const accessToken = generateAccessToken({ username });

    // Set the new access token as a cookie with a short expiration time
    res.setHeader(
      "Set-Cookie",
      `accessToken=${accessToken}; HttpOnly; Path=/; Max-Age=${1 * 60 * 60}`
    );

    // Return the new access token in the response
    return res.status(200).json({ accessToken });
  } else {
    return res.status(405).json({ message: "Method not allowed" });
  }
}
