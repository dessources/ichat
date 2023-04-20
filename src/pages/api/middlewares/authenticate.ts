import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { verifyAccessToken } from "@/utils/jwt";
import { getCookie, getCookies } from "cookies-next";

export default function authenticate(next: NextApiHandler) {
  return async function (req: NextApiRequest, res: NextApiResponse) {
    // Parse the cookies
    const accessToken = getCookie("accessToken", { req, res });
    let reason = "";
    try {
      if (!accessToken) {
        reason = "access token does not exits";
        throw new Error();
      }

      // Verify the token and extract the payload
      // Check if the accessToken is defined, if so
      // we have an authenticated user if not we have
      // an unauthenticated user but with  the api access token
      reason = "accessToken is invalid";
      const payload = verifyAccessToken(<string>accessToken) as {
        username: string;
      };

      /** Attach the payload to the request object for later use */
      if (Object.keys(req.body).length === 0) {
        req.body = { user: payload };
      } else req.body.user = payload;

      // Call the next middleware or API route handler function
      return await next(req, res);
    } catch (error: any) {
      console.error(error);
      return res.status(401).json({ message: "Authentication Failed " + reason });
    }
  };
}
