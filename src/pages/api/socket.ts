import { Message } from "@/models";
import { NextApiRequest, NextApiResponse } from "next";
import { Server, Socket } from "socket.io";

function handler(req: NextApiRequest, res: NextApiResponse) {
  // property 'server' does not exists in type Socket
  // But we are nonetheless setting that property
  // on res.socket in the following lines because
  // we need to. Hence the ts-ignore directives

  //@ts-ignore
  if (!res.socket?.server?.io) {
    //@ts-ignore
    const io = new Server(res.socket?.server, { cors: { origin: "*" } });

    //@ts-ignore
    res.socket.server.io = io;

    io.on("connection", (socket: Socket) => {
      const roomId = socket.handshake.query.roomId;
      process.env.NODE_ENV !== "production" &&
        console.log("joinged room ", roomId);
      //each room contains all the clients where
      //one user is connected
      socket.join(roomId as string);
      socket.on("send-message", (data: Message & { recipients: string[] }) => {
        //for each recipients send the message to their room
        process.env.NODE_ENV !== "production" && console.log(data.recipients);
        data.recipients.forEach((id) =>
          socket.to(id).emit("receive-message", { ...data, recipients: [] })
        );
      });
    });
  }
  res.send("this is socket.io");
  res.end();
}

export const config = {
  api: {
    bodyParser: false,
  },
};

export default handler;
