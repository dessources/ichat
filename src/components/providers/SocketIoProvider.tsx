import React from "react";
import { ChatContext, SocketIoContext, UserContext } from "@/contexts";
import { User, Chat } from "@/models";
import useAppContext from "@/hooks/useAppContext";
import { Socket, io } from "socket.io-client";

function SocketIoProvider(props: any) {
  const [currentChat] = useAppContext<Chat>(ChatContext);
  // const [user] = useAppContext<User>(UserContext);
  const [socket, setSocket] = React.useState<Socket | undefined>();

  React.useEffect(() => {
    let newSocket: Socket;

    //Complete the handshake with the socket.io server
    (async function () {
      await fetch("/api/socket.io");
      newSocket = io();

      newSocket.on("connect", () => {
        console.log("connected to socket.Io server id: ", newSocket?.id);
        setSocket?.(newSocket);
      });
    })();

    return () => {
      newSocket?.close();
      console.log("Disconnected from socket.io");
    };
  }, [setSocket, currentChat]);

  return <SocketIoContext.Provider value={[socket, setSocket]} {...props} />;
}

export default SocketIoProvider;
