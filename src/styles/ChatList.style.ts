import React from "react";
import { SxProps, Theme } from "@mui/material";
import theme from "@/themes/ichat";

// export const root: SxProps<Theme> = {};

export const paper: SxProps<Theme> = {
  width: 288,
  height: "100vh",
  position: "relative",
  background: "var(--light_gray)",
  borderTopLeftRadius: "20px",
  borderRight: "1px solid rgba(0,0,0,0.3)",
  "&:before": {
    position: "absolute",
    content: `" "`,
    width: "1rem",
    height: "1rem",
    zIndex: -1,
    top: 0,
    bgcolor: theme.palette.secondary.main,
    left: 0,
  },
};

export const chat = {
  py: "0.5rem",
  px: 3,
  gap: "1rem",
  color: "rgba(255, 255, 255, 0.7)",
  "&:hover": {
    bgcolor: "rgba(255, 255, 255, 0.08)",
  },
  "& span": {
    color: "#fff",
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
  flexShrink: { sm: 0 },
  bgcolor: "var(--light_gray)",
  position: "relative",
};
// const itemCategory = {
//   boxShadow: "0 -1px 0 rgb(255,255,255,0.1) inset",
//   py: 1.5,
//   px: 3,
// };

export const chatListItem: SxProps<Theme> = {
  textTransform: "capitalize",
};
