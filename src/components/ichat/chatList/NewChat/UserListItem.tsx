import React from "react";

import {
  ListItemButton,
  IconButton,
  Typography,
  Avatar,
  Checkbox,
} from "@mui/material";

//styles
import * as styles from "@/styles/NewChat.style";
function UserListItem({ user }: any) {
  return (
    <ListItemButton sx={styles.userListItem}>
      <IconButton color="inherit" sx={{ p: 0.5 }}>
        <Avatar alt={""}>{user.name[0]}</Avatar>
      </IconButton>
      <Typography component="span">
        {user.name} <Checkbox sx={styles.userListItemCheckBox} />
      </Typography>
    </ListItemButton>
  );
}

export default UserListItem;
