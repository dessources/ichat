import React from "react";
import { User, Context, Chat } from "@/models";
import { Socket } from "socket.io-client";
export const AuthContext = React.createContext<Context<boolean>>([]);
export const ChatContext = React.createContext<Context<Chat>>([]);
export const UserContext = React.createContext<Context<User>>([]);
export const SocketIoContext = React.createContext<Context<Socket>>([]);
