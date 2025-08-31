import React from "react";
import { User, Context, Chat, ChatMessages, ChatUsers } from "@/models";
import { Socket } from "socket.io-client";
export const AuthContext = React.createContext<Context<boolean>>(null);
export const ChatContext = React.createContext<Context<Chat>>(null);
export const ChatMessagesContext =
  React.createContext<Context<ChatMessages>>(null);
export const UserContext = React.createContext<Context<User>>(null);
export const ChatUsersContext = React.createContext<Context<ChatUsers>>(null);

export const SocketIoContext = React.createContext<Context<Socket>>(null);
