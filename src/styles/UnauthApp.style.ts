import React from "react";
import { SxProps, Theme } from "@mui/material";

export const root: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  minWidth: "330px",
};

export const dialog: SxProps<Theme> | undefined = {
  opacity: "0.9",
};

export const dialogContent: SxProps<Theme> | undefined = {
  width: "378px",
};

export const submit: React.CSSProperties = {
  margin: "20px 0 5px 0",
};

export const checkBoxText: React.CSSProperties = {
  fontSize: "0.8rem",
};

export const progress: React.CSSProperties = {
  marginLeft: "1rem",
};

export const alert: React.CSSProperties = {
  marginBottom: "0.5rem",
};
