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
import { message } from "@/styles/Chat.style";
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
      const chatId = socket.handshake.query.chatId;
      socket.join(chatId as string);
      socket.on("send-message", (data: Message) => {
        //each room represents a chat in the app
        socket.to(chatId as string).emit("receive-message", data);
      });
    });
  }

  res.end();
}
