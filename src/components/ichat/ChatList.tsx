//lib
import React from "react";

//utils && hooks && context
import useChats from "@/hooks/useChats";
import { UserContext } from "@/pages";
import getChatPictureURL from "@/utils/getChatPictureURL";
//mui
import Divider from "@mui/material/Divider";
import Drawer, { DrawerProps } from "@mui/material/Drawer";
import List from "@mui/material/List";
import { Avatar, IconButton, Typography } from "@mui/material";

//my components
import ChatListItem from "./ChatListItem";

//styles
import * as styles from "@/styles/ChatList.style";
import { ObjectId } from "mongodb";

export default function ChatList(props: DrawerProps) {
  const { ...other } = props;
  const userContext = React.useContext(UserContext);
  const userId = userContext?.user?.id;

  const { chats, isError, isLoading } = useChats(userId as ObjectId);

  return (
    <Drawer variant="permanent" {...other}>
      {isError ? (
        <Typography component="p">Error !</Typography>
      ) : isLoading ? (
        <Typography component="p">Loading ...</Typography>
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
