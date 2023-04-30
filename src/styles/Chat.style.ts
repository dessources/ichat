import React from "react";
import { SxProps, Theme } from "@mui/material";
import { root as HeaderRoot } from "@/styles/Header.style";

export const header: SxProps<Theme> = {
  ...HeaderRoot,
  bgcolor: "var(--light_gray)",
  borderBottom: "1px solid rgba(0,0,0,0.3)",
  height: "4rem",
  position: "relative",
};

export const toolbar: SxProps<Theme> = {
  margin: "auto 0",
};

export const messageList: SxProps<Theme> = {
  position: "absolute",
  bottom: "60px",
  left: "50%",
  transform: "translateX(-50%)",
  maxHeight: "calc(100% - 7rem)",
  width: "100%",
  marginRight: "5px",
  padding: "1rem 10%",
  display: "flex",
  flexDirection: "column",
  rowGap: "0.3rem",
  overflowY: "auto",

  "&::-webkit-scrollbar": {
    width: "3px",
  },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: "#9f9f9f",
    borderRadius: "20px",
    borderColor: "transparent",
  },
};

export const message: SxProps<Theme> = {
  flexDirection: "column",
  color: "#d7d7d7",
  listStyleType: "none",
  padding: "0.25rem 0.5rem",
  width: "fit-content",
  maxWidth: "45%",
  borderRadius: "5px",
  borderTop: "1px solid",

  boxShadow: "2px 8px 5px #272727",
  fontFamily: "Helvetica",
  fontSize: "14px",
  position: "relative",
  wordWrap: "break-word",
  overflowWrap: "anywhere",
};

export const sent = {
  background: "var(--sent_message_color)",
  alignSelf: "flex-end",
  borderColor: "#136757",
  "&::before": {
    content: `" "`,
    position: "absolute",

    top: "-1px",
    width: " 20px",
    borderRight: "10px solid transparent",
    borderRadius: "6px",
    right: "-10px",
    borderTop: "10px solid var(--sent_message_color)",
  },
};

export const received: SxProps<Theme> = {
  background: "var(--received_message_color)",
  alignSelf: "flex-start",
  borderColor: "#3f3f3f",
  "&::before": {
    content: `" "`,
    position: "absolute",
    zIndex: "-1",
    top: "-1px",
    width: " 20px",
    borderRight: "10px solid transparent",
    borderRadius: "6px",
    left: "-10px",
    transform: "rotateY(180deg)",
    borderTop: "10px solid var(--received_message_color)",
    boxShadow: "2px 8px 5px #272727",
  },
};

export const time: React.CSSProperties = {
  fontSize: "10px",
  alignSelf: "flex-end",
  opacity: 0.6,
};

export const input: SxProps<Theme> = {
  height: "60px",
  width: "100%",
  background: "var(--dark_gray)",
  position: "fixed",
  bottom: "0",
  padding: "0.5rem",
  outline: "none",
  alignItems: "center",
  "& textarea": {
    border: "none",
    appearance: "none",
    background: "none",
    outline: "none",
    resize: "none",
    width: "80%",
    padding: "0 10px",
    color: "#d7d7d7",
    fontFamily: "Helvetica",
    fontSize: "16px",
    marginRight: "15px",
    "&::-webkit-scrollbar": {
      width: "3px",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "#9f9f9f",
      borderRadius: "20px",
      borderColor: "transparent",
    },
  },
};
