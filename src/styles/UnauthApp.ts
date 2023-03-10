import React from "react";

import ComponentStyle from "@/models/ComponentStyle";
import { SxProps, Theme } from "@mui/material";
const root: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  minWidth: "330px",
};

const dialog: SxProps<Theme> | undefined = {
  "&  h2": {
    color: "var(--accent-color)",
  },
  opacity: "0.9",
};

const submit: React.CSSProperties = {
  margin: "20px 0 5px 0",
  background: "var(--accent-color)",
};

const checkBoxText: React.CSSProperties = {
  fontSize: "0.8rem",
};

const actionText: SxProps<Theme> | undefined = {
  color: "var(--accent-color)",
};

export { root, dialog, submit, checkBoxText, actionText };
