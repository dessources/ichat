import React from "react";
import { SxProps, Theme } from "@mui/material";
import { alpha } from "@mui/material/styles";
import theme from "@/themes/ichat";
import { time } from "@/styles/Chat.style";

// export const root: SxProps<Theme> = {};

export const paper: SxProps<Theme> = {
  width: 350,
  height: "100vh",
  display: "flex",
  flexDirection: "column",
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

export const header: SxProps<Theme> = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  marginRight: "1rem",
};

export const title: SxProps<Theme> = {
  py: "0.5rem",
  px: 3,
  gap: "1rem",
};

export const addChatIcon: SxProps<Theme> = {
  display: "flex",
  alignItems: "flex-end",
  "& svg": {
    fill: "white",
    transform: "rotateY(180deg)",
  },
};

export const search: SxProps<Theme> = {
  marginRight: "10px",
  marginLeft: "10px",
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    /*marginLeft: theme.spacing(1),*/
    width: "auto",
  },
};

export const searchIconWrapper: SxProps<Theme> = {
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  top: "0",
  right: "5%",
  transform: "rotateY(180deg)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  pointerEvents: "none",
  opacity: "0.5",
};

export const inputBase: SxProps<Theme> = {
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 1),
    // vertical padding + font size from searchIcon
    paddingLeft: `24px`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
};

export const chat = {
  py: "0.25rem",
  px: 1.5,
  gap: "1rem",
  color: "rgba(255, 255, 255, 0.7)",
  "&:hover": {
    bgcolor: "rgba(255, 255, 255, 0.08)",
  },
  "& span": {
    color: "#fff",
    fontWeight: 500,
  },
};

export const chatList: SxProps<Theme> = {
  marginTop: "1rem",
  flexShrink: { sm: 0 },
  bgcolor: "var(--light_gray)",
  position: "relative",
  flex: "1",
  overflowY: "auto",
  height: "90%",
};
// const itemCategory = {
//   boxShadow: "0 -1px 0 rgb(255,255,255,0.1) inset",
//   py: 1.5,
//   px: 3,
// };

export const chatListItem: SxProps<Theme> = {
  textTransform: "capitalize",
};
export const chatInfo: SxProps<Theme> = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-start",
  flexGrow: 1,
};
export const lastMessageExcerpt: React.CSSProperties = {
  color: "#919191",
  fontSize: "0.75rem",
};

export const chatDetails: SxProps<Theme> = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: "2px",
  paddingTop: "4px",

  "& .unreadMessageCount": {
    fontSize: "0.75rem",
    backgroundColor: theme.palette.primary.main,
    borderRadius: "50%",
    height: "20px",
    minWidth: "20px",
    padding: "0 4px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
};

export const timestamp = {
  ...time,
  alignSelf: "normal",
};

// width: 23px;
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     line-height: 0;
//     font-size: 13px;
//     height: 23px;
//     background-color: #0a80ff;
//     color: #fff;
//     border-radius: 50%;
//     margin-left: auto;

export const noResult: SxProps<Theme> = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100%",
  opacity: "0.5",
};
