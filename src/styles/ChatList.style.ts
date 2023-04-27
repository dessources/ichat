import React from "react";
import { SxProps, Theme } from "@mui/material";
import { ComponentStyle } from "@/models";
export const paper: SxProps<Theme> = {
  left: "3rem",
  top: "3rem",
  background: "var(--light_gray)",
  borderTopLeftRadius: "20px",
  borderRight: "1px solid rgba(0,0,0,0.3)",
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
export const title: SxProps<Theme> = {
  py: "0.5rem",
  px: 3,
  gap: "1rem",
  color: "rgba(255, 255, 255, 0.7)",
};

export const chatList: SxProps<Theme> = {
  marginTop: "1rem",
};
// const itemCategory = {
//   boxShadow: "0 -1px 0 rgb(255,255,255,0.1) inset",
//   py: 1.5,
//   px: 3,
// };

export const avatar: SxProps<Theme> = {
  textTransform: "uppercase",
};

export const chatListItem: SxProps<Theme> = {
  textTransform: "capitalize",
};
