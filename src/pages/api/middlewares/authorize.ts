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

      /** Attach the payload to the request object for later use */
      if (username === "system") {
        // res
        //   .status(403)
        //   .json({
        //     message: "if-block",
        //     test: username === "system",
        //     apiAccessToken,
        //   });
        return await next(req, res);
      } else {
        res.status(403).json({
          message: "else-block",
          test: username === "system",
        });
        throw new Error();
      }
      // Call the next middleware or API route handler function
    } catch (error: any) {
      console.error(error);
      return res.status(403).json({
        message: "Not authorized ",
      });
    }
  };
}
