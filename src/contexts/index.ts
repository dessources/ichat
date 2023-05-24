import React from "react";
import { User, Context, Chat, ChatMessages, ChatUsers } from "@/models";
import { Socket } from "socket.io-client";
export const AuthContext = React.createContext<Context<boolean>>([]);
export const ChatContext = React.createContext<Context<Chat>>([]);
export const ChatMessagesContext = React.createContext<Context<ChatMessages>>([]);
export const UserContext = React.createContext<Context<User>>([]);
export const ChatUsersContext = React.createContext<Context<ChatUsers>>([]);

export const SocketIoContext = React.createContext<Context<Socket>>([]);
