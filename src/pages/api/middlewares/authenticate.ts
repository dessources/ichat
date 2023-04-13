import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { verifyToken } from "@/utils/jwt";

export async function authenticate(
  req: NextApiRequest,
  res: NextApiResponse,
  next: NextApiHandler
) {
  const token = req.headers.authorization?.split(" ")[1];

  try {
    if (!token) {
      throw new Error();
    }
    // Verify the token and extract the payload
    const payload = verifyToken(token) as { username: string };

    // Attach the payload to the request object for later use
    if (payload?.username !== "unauthenticated_user") req.body = payload;

    // Call the next middleware or API route handler function
    await next(req, res);
  } catch (error: any) {
    return res.status(401).json({ message: "Authentication Failed" });
  }
}
