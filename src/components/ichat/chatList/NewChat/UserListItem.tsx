import React from "react";

import {
  ListItemButton,
  IconButton,
  Typography,
  Avatar,
  Checkbox,
  Box,
} from "@mui/material";

//utils
import contentService from "@/services/contentService";

//styles
import * as styles from "@/styles/NewChat.style";

function UserListItem({ user, addUser, removeUser, isGroup, selected }: any) {
  const [checked, setChecked] = React.useState(selected);

  const handleClick = () => {
    if (isGroup) {
      setChecked(!checked);
      if (checked) {
        removeUser(user);
      } else addUser(user);
    } else {
      //  contentService. createNewChat(user, false);
    }
  };
  return (
    <ListItemButton sx={styles.userListItem} onClick={handleClick}>
      <IconButton color="inherit" sx={{ p: 0.5 }}>
        <Avatar alt={""} src={user.profilePicture}>
          {user.name[0].toUpperCase()}
        </Avatar>
      </IconButton>
      <Box sx={styles.userDetails}>
        <Box className={"text"}>
          <Typography component="span">{user.name} </Typography>
          <Typography component="span" sx={{ fontSize: "0.8rem" }}>
            @{user.username}{" "}
          </Typography>
        </Box>

        {isGroup && (
          <Checkbox sx={styles.userListItemCheckBox} checked={checked} />
        )}
      </Box>
    </ListItemButton>
  );
}

export default UserListItem;
