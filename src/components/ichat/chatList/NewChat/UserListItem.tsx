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
function UserListItem({ user, addUser, removeUser, isGroup }: any) {
  const [checked, setChecked] = React.useState(false);

  const handleChange = () => {
    setChecked(!checked);
    if (checked) {
      removeUser(user);
    } else addUser(user);
  };
  return (
    <ListItemButton sx={styles.userListItem} onClick={handleChange}>
      <IconButton color="inherit" sx={{ p: 0.5 }}>
        <Avatar alt={""}>{user.name[0]}</Avatar>
      </IconButton>
      <Typography component="span">
        {user.name}{" "}
        {isGroup && (
          <Checkbox sx={styles.userListItemCheckBox} checked={checked} />
        )}
      </Typography>
    </ListItemButton>
  );
}

export default UserListItem;
