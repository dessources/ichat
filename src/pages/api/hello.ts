// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import authenticate from "./middlewares/authenticate";
import authorize from "./middlewares/authorize";
import allowMethods from "./middlewares/allowMethods";
type Data = {
  name: string;
};

// export default authenticate(
//   authorize(function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
//     res.status(200).json({ name: "John Doe" });
//   })
// );
export default allowMethods(
  ["GET"],
  (req: NextApiRequest, res: NextApiResponse<Data>) => {
    res.status(200).json({ name: "John Doe" });
  }
);
