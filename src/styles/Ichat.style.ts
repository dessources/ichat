import React from "react";
import { SxProps, Theme } from "@mui/material";

export const sidebar: SxProps<Theme> = {
  width: "3rem",
  height: "100rem",
  left: 0,
  zIndex: 1,
  boxShadow: "none",
};

export const chat: SxProps<Theme> = {
  flex: 1,

  position: "relative",
  background: "url(background.png) fixed",
};

export const main: SxProps = {
  display: "flex",

  overflow: "hidden",
  marginTop: "3rem",
  marginLeft: "3rem",
  height: "calc(100vh - 3rem)",
};

export const avatar: SxProps<Theme> = {
  textTransform: "uppercase",
  background: "#444",
};
