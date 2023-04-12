import React from "react";
import { SxProps, Theme } from "@mui/material";

export const root: SxProps<Theme> | undefined = {
  height: "3rem",
  boxShadow: "none",
};

export const toolbar: SxProps<Theme> = {
  paddingLeft: "0.2rem !important",
};

export const logo: React.CSSProperties | undefined = {
  marginRight: "0.5rem",
  verticalAlign: "top",
};
