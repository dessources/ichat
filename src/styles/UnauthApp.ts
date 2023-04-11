import React from "react";
import { SxProps, Theme } from "@mui/material";

export const root: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  minWidth: "330px",
};

export const dialog: SxProps<Theme> | undefined = {
  "&  h2": {
    color: "var(--accent-color)",
  },
  opacity: "0.9",
};
export const textField: SxProps<Theme> | undefined = {
  "& label.Mui-focused": {
    color: "var(--accent-color)",
  },
  "& div.Mui-focused:after": {
    borderColor: "var(--accent-color)",
  },
};
export const dialogContent: SxProps<Theme> | undefined = {
  width: "378px",
};

export const submit: React.CSSProperties = {
  margin: "20px 0 5px 0",
  background: "var(--accent-color)",
};

export const checkBoxText: React.CSSProperties = {
  fontSize: "0.8rem",
};

export const actionText: SxProps<Theme> | undefined = {
  color: "var(--accent-color)",
};

export const progress: React.CSSProperties = {
  marginLeft: "1rem",
};
