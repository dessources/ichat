import clientPromise from "../../../lib/mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import authorize from "./middlewares/authorize";
import authenticate from "./middlewares/authenticate";
import { Collection } from "mongodb";
import { Message } from "@/models";
// import { v4 } from "uuid";

export default authenticate(
  authorize(async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {
      const client = await clientPromise;

      const messages: Collection<Message> = client
        .db("ichat")
        .collection("messages");
      let result: Message[];

      try {
        const { chatId, sentAfter = new Date(0) } = req.body;

        result = await messages
          .find({ chat: chatId, timestamp: { $gte: sentAfter } })
          .toArray();

        return res.status(200).json(result);
      } catch (err) {
        process.env.NODE_ENV !== "production" && console.log(err);
        res.status(500).json({ message: "Something went wrong", error: err });
      }
      // messages.insertMany([
      //   {
      //     chat: "73fe627a-448e-4f10-b5f2-9522201217ff",
      //     sender: "c5b6ac1a-7a5c-4578-87e1-9658c45e02bc",
      //     id: "e1d2e586-8f4b-47cd-86ce-b26df92dd127",
      //     content: "Hey, have you used TypeScript before?",
      //     timestamp: new Date().toISOString(),
      //   },
      //   {
      //     chat: "73fe627a-448e-4f10-b5f2-9522201217ff",
      //     sender: "c5b6ac1a-7a5c-4578-87e1-9658c45e02bc",
      //     id: v4(),
      //     content:
      //       "Yes, I've used it on a few projects. It's great for catching errors early.",
      //     timestamp: new Date().toISOString(),
      //   },
      //   {
      //     timestamp: new Date().toISOString(),
      //     chat: "73fe627a-448e-4f10-b5f2-9522201217ff",
      //     sender: "e1d2e586-8f4b-47cd-86ce-b26df92dd127",
      //     id: v4(),
      //     content:
      //       "That's what I've heard. I'm thinking about using it for my next project. fjepiofhjpewoiugheworpgheiuorhiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiir rigjpqqqqqqqqqqroiiiiiiiiiigjhpppppppppppppppppppppppppp pppppppppppppppppppppppppppppppppppp",
      //   },
      //   {
      //     timestamp: new Date().toISOString(),
      //     chat: "73fe627a-448e-4f10-b5f2-9522201217ff",
      //     sender: "c5b6ac1a-7a5c-4578-87e1-9658c45e02bc",
      //     id: v4(),
      //     content:
      //       "Definitely give it a try. It can take some getting used to, but it's worth it in the end.",
      //   },
      //   {
      //     timestamp: new Date().toISOString(),
      //     chat: "73fe627a-448e-4f10-b5f2-9522201217ff",
      //     sender: "e1d2e586-8f4b-47cd-86ce-b26df92dd127",
      //     id: v4(),
      //     content: "Thanks for the advice. I'll let you know how it goes!",
      //   },
      //   {
      //     timestamp: new Date().toISOString(),
      //     chat: "73fe627a-448e-4f10-b5f2-9522201217ff",
      //     sender: "c5b6ac1a-7a5c-4578-87e1-9658c45e02bc",
      //     id: v4(),
      //     content: "No problem, happy to help!",
      //   },
      //   {
      //     timestamp: new Date().toISOString(),
      //     chat: "73fe627a-448e-4f10-b5f2-9522201217ff",
      //     sender: "e1d2e586-8f4b-47cd-86ce-b26df92dd127",
      //     id: v4(),
      //     content: "Have you used any TypeScript libraries that you'd recommend?",
      //   },
      //   {
      //     timestamp: new Date().toISOString(),
      //     chat: "73fe627a-448e-4f10-b5f2-9522201217ff",
      //     sender: "c5b6ac1a-7a5c-4578-87e1-9658c45e02bc",
      //     id: v4(),
      //     content:
      //       "Definitely check out React with TypeScript. It's a great combination.",
      //   },
      //   {
      //     timestamp: new Date().toISOString(),
      //     chat: "73fe627a-448e-4f10-b5f2-9522201217ff",
      //     sender: "e1d2e586-8f4b-47cd-86ce-b26df92dd127",
      //     id: v4(),
      //     content: "I'll look into it. Thanks!",
      //   },
      //   {
      //     timestamp: new Date().toISOString(),
      //     chat: "73fe627a-448e-4f10-b5f2-9522201217ff",
      //     sender: "c5b6ac1a-7a5c-4578-87e1-9658c45e02bc",
      //     id: v4(),
      //     content: "You're welcome. Let me know if you have any other questions.",
      //   },
      //   {
      //     timestamp: new Date().toISOString(),
      //     chat: "73fe627a-448e-4f10-b5f2-9522201217ff",
      //     sender: "e1d2e586-8f4b-47cd-86ce-b26df92dd127",
      //     id: v4(),
      //     content:
      //       "Actually, do you have any good resources for learning TypeScript?",
      //   },
      //   {
      //     timestamp: new Date().toISOString(),
      //     chat: "73fe627a-448e-4f10-b5f2-9522201217ff",
      //     sender: "c5b6ac1a-7a5c-4578-87e1-9658c45e02bc",
      //     id: v4(),
      //     content:
      //       "Sure, I'd recommend the official TypeScript documentation and the TypeScript Handbook.",
      //   },
      //   {
      //     timestamp: new Date().toISOString(),
      //     chat: "73fe627a-448e-4f10-b5f2-9522201217ff",
      //     sender: "e1d2e586-8f4b-47cd-86ce-b26df92dd127",
      //     id: v4(),
      //     content: "Thanks, I'll check those out.",
      //   },
      //   {
      //     timestamp: new Date().toISOString(),
      //     chat: "73fe627a-448e-4f10-b5f2-9522201217ff",
      //     sender: "c5b6ac1a-7a5c-4578-87e1-9658c45e02bc",
      //     id: v4(),
      //     content:
      //       "No problem. TypeScript can be a bit overwhelming at first, but it's worth the effort.",
      //   },
      //   {
      //     timestamp: new Date().toISOString(),
      //     chat: "73fe627a-448e-4f10-b5f2-9522201217ff",
      //     sender: "e1d2e586-8f4b-47cd-86ce-b26df92dd127",
      //     id: v4(),
      //     content: "I'm excited to learn it. Thanks again for your help!",
      //   },
      //   {
      //     timestamp: new Date().toISOString(),
      //     chat: "73fe627a-448e-4f10-b5f2-9522201217ff",
      //     sender: "c5b6ac1a-7a5c-4578-87e1-9658c45e02bc",
      //     id: v4(),
      //     content:
      //       "Of course, happy to help. Good luck with your TypeScript journey!",
      //   },
      //   {
      //     timestamp: new Date().toISOString(),
      //     chat: "73fe627a-448e-4f10-b5f2-9522201217ff",
      //     sender: "e1d2e586-8f4b-47cd-86ce-b26df92dd127",
      //     id: v4(),
      //     content: "Thanks, talk to you later!",
      //   },
      //   {
      //     timestamp: new Date().toISOString(),
      //     chat: "73fe627a-448e-4f10-b5f2-9522201217ff",
      //     sender: "c5b6ac1a-7a5c-4578-87e1-9658c45e02bc",
      //     id: v4(),
      //     content: "See you later!",
      //   },
      //   {
      //     timestamp: new Date().toISOString(),
      //     chat: "73fe627a-448e-4f10-b5f2-9522201217ff",
      //     sender: "e1d2e586-8f4b-47cd-86ce-b26df92dd127",
      //     id: v4(),
      //     content: "Hey, are you still there?",
      //   },
      //   {
      //     timestamp: new Date().toISOString(),
      //     chat: "73fe627a-448e-4f10-b5f2-9522201217ff",
      //     sender: "c5b6ac1a-7a5c-4578-87e1-9658c45e02bc",
      //     id: v4(),
      //     content: "Yes, I'm still here. What's up?",
      //   },
      // ]);
    } else {
      res.status(405).json({ message: "Bad request" });
    }
  })
);
