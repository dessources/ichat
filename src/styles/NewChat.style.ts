// import { Theme, SxProps } from "@mui/material";
import theme from "@/themes/ichat";
import { alpha } from "@mui/material/styles";

export const newChatModal = {
  width: "4rem",
  height: "fit-content",
  maxHeight: "10rem",
};

export const newChatBox = {
  display: "flex",
  flexDirection: "column",
  gap: "5px",
  marginTop: "5rem",
  marginLeft: "300px",
  borderRadius: "20px",
  background: "var(--light_gray)",
  width: "20rem",
  minHeight: "25rem",
  height: "fit-content",
  padding: "10px 10px",
  boxShadow: "-1px 1px 10px #000",
};
export const newChatHeader = {
  marginLeft: "10px",
  fontWeight: "bold",
  fontSize: "1.2rem",
};

export const groupChatHeader = {
  display: "flex",
  gap: "5px",
  alignItems: "center",
  "& button": {
    padding: "6px",
    minWidth: "32px",
  },

  "& h4": {
    fontWeight: "bold",
    fontSize: "1.2rem",
  },
};

export const usernameTextField = {
  padding: "0px 10px",
  marginBottom: "0.25rem",
  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: "#d7d7d7 !important",
  },
  "& input": { height: "0.5rem", color: "#fff" },
};

export const groupChatButton = {
  display: "flex",
  gap: "1rem",
  alignItems: "center",
  padding: "0.5rem 0.5rem",
  borderRadius: "0.5rem",
  cursor: "pointer",
  "&:hover": {
    bgcolor: "rgba(255, 255, 255, 0.08)",
  },
};

export const groupChatIcon = {
  background: theme.palette.primary.main,
};

export const selectedUsers = {
  display: "flex",
  marginLeft: "10px",
  gap: "5px",
};

export const selectedUser = {
  padding: "0.5px",
  background: alpha(theme.palette.primary.main, 0.7),
  color: "#fff",

  "&:hover": {
    background: alpha(theme.palette.primary.main, 0.6),
  },
};

export const userListItem = {
  gap: "8px",
  "&:hover": { background: "rgba(255, 255, 255, 0.08)" },
  "& span.MuiTypography-root": {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
};

export const userListItemCheckBox = {
  "& .MuiSvgIcon-root": { fontSize: 28 },
};

export const nextCancelButtons = {
  display: "flex",
  justifyContent: "center",
};
