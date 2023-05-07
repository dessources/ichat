// import { Message } from "@/models";
// import { NextApiRequest, NextApiResponse } from "next";
// import { Server } from "socket.io";

// export default function handler(req: NextApiRequest, res: NextApiResponse) {
//   const res.socket = res.socket;
//   if (res.socket?.server?.io) {
//     console.log("Socket is already running");
//   } else {
//     console.log("initializing Socket");

//     const io = new Server(res.socket?.server);
//     res.socket.server.io = io;
//     io.on("connection", (socket) => {
//       socket.on("send-message", (data: Message) => {
//         console.log("Received message:", data.content);
//         socket.broadcast.emit("receive-message", data);
//       });
//     });
//   }

//   res.end();
// }

import { Message } from "@/models";
import { NextApiRequest, NextApiResponse } from "next";
import { Server, Socket } from "socket.io";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // property 'server' does not exists in type Socket
  // But we are nonetheless setting that property
  // on res.socket in the following lines because
  // we need to. Hence the ts-ignore directives

  //@ts-ignore
  if (res.socket?.server?.io) {
    console.log("Socket is already running");
  } else {
    console.log("initializing Socket");
    //@ts-ignore
    const io = new Server(res.socket?.server);
    //@ts-ignore
    res.socket.server.io = io;
    io.on("connection", (socket: Socket) => {
      const roomId = socket.handshake.query.roomId;
      console.log("joinged room ", roomId);
      //each room contains all the clients where
      //one user is connected
      socket.join(roomId as string);
      socket.on("send-message", (data: Message & { recipients: string[] }) => {
        //for each recipients send the message to their room
        console.log(data.recipients);
        data.recipients.forEach((id) =>
          socket.to(id).emit("receive-message", { ...data, recipients: [] })
        );
      });
    });
  }

  res.end();
}
