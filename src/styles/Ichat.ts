import React from "react";

import { SxProps, Theme } from "@mui/material";

export const sidebar: SxProps<Theme> | undefined = {
  width: "3rem",
  height: "100rem",
  left: 0,
  zIndex: 1,
};
export const chatContainer: SxProps<Theme> | undefined = {
  flexShrink: { sm: 0 },
  bgcolor: "secondary",
  position: "relative",
  left: "3rem",
  top: "3rem",
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
export const main: SxProps<Theme> | undefined = {
  flex: 1,
  py: 6,
  px: 4,
  background: "var(--light_gray)",
};
