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
      console.log("this socket", socket.id, "connected");
      socket.on("send-message", (data: Message) => {
        console.log(socket.id, "Received message:", data.content);
        socket.broadcast.emit("receive-message", data);
      });
      setTimeout(() => {
        socket.emit("receive-message", {
          content: "10 seconds ago you connected",
          _id: "notyou",
          timestamp: Date.now(),
        });
      }, 10000);
    });
  }

  res.end();
}
