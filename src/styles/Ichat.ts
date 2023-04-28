import React from "react";

import { SxProps, Theme } from "@mui/material";

export const sidebar: SxProps<Theme> = {
  width: "3rem",
  height: "100rem",
  left: 0,
  zIndex: 1,
};
export const chatList: SxProps<Theme> = {
  flexShrink: { sm: 0 },
  bgcolor: "secondary",
  position: "relative",

  "&:before": {
    position: "absolute",
    content: `" "`,
    width: "1rem",
    "z-index": -1,
    height: "1rem",
    top: 0,
    bgcolor: "var(--dark_gray)",
    left: 0,
  },
};
export const chat: SxProps<Theme> = {
  flex: 1,
  py: 6,
  px: 4,

  // background: "var(--light_gray)",
  background: "url(background.png) fixed",
};

export const main: SxProps = {
  display: "flex",

  overflow: "hidden",
  marginTop: "3rem",
  marginLeft: "3rem",
  height: "calc(100vh - 3rem)",
};
