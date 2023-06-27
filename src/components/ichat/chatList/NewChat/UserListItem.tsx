import React, { use } from "react";
//models

import { ChatContext as ChatContextType, Context, User } from "@/models";
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
import useAppContext from "@/hooks/useAppContext";
import { ChatContext, UserContext } from "@/contexts";

function UserListItem({
  user,
  addUser,
  removeUser,
  isGroup,
  selected,
  setOpen,
}: any) {
  const [checked, setChecked] = React.useState(selected);
  const [currentUser] = useAppContext(UserContext) as Context<User>;
  const { setChats, setCurrentChat } = useAppContext(
    ChatContext
  ) as ChatContextType;
  const handleClick = () => {
    if (isGroup) {
      setChecked(!checked);
      if (checked) {
        removeUser(user);
      } else addUser(user);
    } else {
      contentService
        .createNewChat(
          {
            users: [user],
            currentUserId: currentUser?.id as string,
          },
          false
        )
        .then((chat) => {
          setChats((prev) => [chat, ...prev]);
          setCurrentChat(chat);
          setOpen(false);
        });
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
