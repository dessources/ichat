import React from "react";
import { User, Context, Chat } from "@/models";
export const AuthContext = React.createContext<Context<boolean>>([]);
export const ChatContext = React.createContext<Context<Chat>>([]);
export const UserContext = React.createContext<Context<User>>([]);
