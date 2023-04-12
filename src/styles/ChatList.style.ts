import React from "react";
import { SxProps, Theme } from "@mui/material";

export const paper: SxProps<Theme> = {
  left: "3rem",
  top: "3rem",
  background: "#1b1b1b",
  borderTopLeftRadius: "20px",
  "&:before": {
    position: "absolute",
    content: `" "`,
    width: "1rem",
    "z-index": -1,
    height: "1rem",
    top: 0,
    left: 0,
  },
};

export const chat = {
  py: "0.5rem",
  px: 3,
  gap: "1rem",
  color: "rgba(255, 255, 255, 0.7)",
  "&:hover, &:focus": {
    bgcolor: "rgba(255, 255, 255, 0.08)",
  },
};

export const chatList: SxProps<Theme> = {
  marginTop: "1rem",
};
// const itemCategory = {
//   boxShadow: "0 -1px 0 rgb(255,255,255,0.1) inset",
//   py: 1.5,
//   px: 3,
// };
