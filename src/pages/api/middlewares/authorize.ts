import type { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { verifyAccessToken } from "@/utils/jwt";

export default function authorize(next: NextApiHandler) {
  return async function (req: NextApiRequest, res: NextApiResponse) {
    const apiAccessToken = req.headers.authorization?.split(" ")[1];
    let username;
    let reason;
    try {
      if (!apiAccessToken) {
        throw new Error();
      }
      reason = "token invalid";
      const payload = verifyAccessToken(<string>apiAccessToken) as {
        username: string;
      };
      username = payload.username;
      // res.status(200).json({ message: "what now ?", username, apiAccessToken });
      /** Attach the payload to the request object for later use */
      if (username === "system") return await next(req, res);
      else throw new Error();
      // Call the next middleware or API route handler function
    } catch (error: any) {
      console.error(error);
      return res.status(403).json({
        message: "Not authorized ",
        username,
        apiAccessToken,
      });
    }
  };
}
