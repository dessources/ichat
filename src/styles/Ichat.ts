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
  bgcolor: "#081627",
  position: "relative",
  left: "3rem",
  top: "3rem",
};
export const main: SxProps<Theme> | undefined = {
  flex: 1,
  py: 6,
  px: 4,
  background: "url('/micro_carbon.png')",
};
