import clientPromise from "@/lib/mongodb";

import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";

export default function closeDbConnectionOnResolve(next: NextApiHandler) {
  return async function (req: NextApiRequest, res: NextApiResponse) {
    // add the client to the global object so it can be accessed from
    // anywhere

    try {
      await next(req, res);
    } catch (error) {
      console.error(error);
      res.status(500).send("Error connecting to database");
    } finally {
      //if we are in a test environment, we want the connection
      //to stay open until all tests are done running
      //after which said connection will be closed in the test's
      //afterAll hook
      if (process.env.NODE_ENV !== "test") (await clientPromise).close();
    }
  };
}
