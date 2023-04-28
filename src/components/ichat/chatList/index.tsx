//lib
import React from "react";

//utils && hooks && context
import useAppContext from "@/hooks/useAppContext";
import { UserContext } from "@/contexts";

import { Chat, User } from "@/models";

//mui
import Drawer, { DrawerProps } from "@mui/material/Drawer";
import List from "@mui/material/List";
import { Typography } from "@mui/material";

//my components
import ChatListItem from "./ChatListItem";

//styles
import * as styles from "@/styles/ChatList.style";
import { ObjectId } from "mongodb";
import useFetchData from "@/hooks/useFetchData";
import userService from "@/services/userService";

export default function ChatList(props: DrawerProps) {
  const { ...other } = props;
  const [user] = useAppContext<User>(UserContext);

  const {
    data: chats,
    isError,
    isLoading,
  } = useFetchData<Chat[]>(
    { url: "/chats", userId: user?._id as ObjectId },
    userService.getChats
  );

  return (
    <Drawer variant="permanent" {...other}>
      {isError ? (
        <Typography sx={styles.title} component="p">
          Error !
        </Typography>
      ) : isLoading ? (
        <Typography sx={styles.title} component="p">
          Loading ...
        </Typography>
      ) : (
        <>
          <Typography sx={styles.title} variant="h5">
            Chats
          </Typography>
          <List disablePadding sx={styles.chatList}>
            {chats?.map((chat, i) => (
              <ChatListItem key={i} chat={chat} />
            ))}
          </List>
        </>
      )}
    </Drawer>
  );
}
