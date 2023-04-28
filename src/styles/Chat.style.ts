import React from "react";
import { SxProps, Theme } from "@mui/material";
import { root as HeaderRoot } from "@/styles/Header.style";
import { Message, User } from "@/models";

export const header: SxProps<Theme> = {
  ...HeaderRoot,
  bgcolor: "var(--light_gray)",
  borderBottom: "1px solid rgba(0,0,0,0.3)",
  height: "4rem",
  position: "sticky",
};

export const toolbar: SxProps<Theme> = {
  margin: "auto 0",
};

export const messageList: React.CSSProperties = {
  position: "absolute",
  bottom: "0",
  marginTop: "4rem",
  marginBottom: "55px",
  padding: "0 14%",
  height: "100%",
  width: "100%",
  display: "flex",
  flexDirection: "column",
  rowGap: "0.3rem",
  overflowY: "auto",
};

export function message(message: Message, user: User): React.CSSProperties {
  return {
    alignSelf: message.sender !== user?._id ? "flex-start" : "flex-end",
    color: "#d7d7d7",
    listStyleType: "none",
    padding: "0.5rem 0.5rem",
    background:
      message.sender !== user?._id
        ? "var(--received_message_color)"
        : "var(--sent_message_color)",
    width: "fit-content",
    maxWidth: "45%",
    borderRadius: " 5px",
    boxShadow: "2px 8px 5px #272727",
  };
}
