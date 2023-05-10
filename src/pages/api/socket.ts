import { Message } from "@/models";
import { NextApiRequest, NextApiResponse } from "next";
import { Server, Socket } from "socket.io";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // property 'server' does not exists in type Socket
  // But we are nonetheless setting that property
  // on res.socket in the following lines because
  // we need to. Hence the ts-ignore directives
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "X-Requested-With");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
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

  res.end();
}
