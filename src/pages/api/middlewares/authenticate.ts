import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { verifyAccessToken } from "@/utils/jwt";
import { getCookie, getCookies } from "cookies-next";

export default function authenticate(next: NextApiHandler) {
  return async function (req: NextApiRequest, res: NextApiResponse) {
    // Parse the cookies
    const accessToken = getCookie("accessToken", { req, res });

    try {
      if (!accessToken) {
        throw new Error();
      }

      // Verify the token and extract the payload
      // Check if the accessToken is defined, if so
      // we have an authenticated user if not we have
      // an unauthenticated user but with  the api access token

      const payload = verifyAccessToken(<string>accessToken) as {
        username: string;
      };

      /** Attach the payload to the request object for later use */
      if (!req.body) req.body = { user: payload };
      else req.body.user = payload;

      // Call the next middleware or API route handler function
      await next(req, res);
      req.method === "PUT" && console.log("\nWe got here too ?\n");
    } catch (error: any) {
      process.env.NODE_ENV === "test" && console.error(error);
      return res.status(401).json({ message: "Authentication Failed" });
    }
  };
}
