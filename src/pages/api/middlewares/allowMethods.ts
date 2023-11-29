import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
export default function allowMethods(
  allowedMethods: string[],
  next: NextApiHandler
) {
  return async function (req: NextApiRequest, res: NextApiResponse) {
    if (allowedMethods.includes(<string>req.method)) await next(req, res);
    else {
      res
        .status(405)
        .json({
          message: `Method ${req.method} not allowed. Allowed metthods are ${allowedMethods}`,
        });
    }
  };
}
