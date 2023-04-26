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
import Box from "@mui/material/Box";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import { Avatar, IconButton, Typography } from "@mui/material";

//my components
import ChatInfo from "./ChatInfo";
//styles
import * as styles from "@/styles/ChatList.style";
import { ObjectId } from "mongodb";

export default function ChatList(props: DrawerProps) {
  const { ...other } = props;
  const userContext = React.useContext(UserContext);
  const userId = userContext?.user?.id;
  const [chatProps, setChatProps] = React.useState(null);
  const { chats, isError, isLoading } = useChats(userId as ObjectId);

  React.useEffect(() => {
    getChatProps().then((props) => setChatProps(props));
  }, [chats]);

  if (isLoading) return <p>Loading ...</p>;
  if (isError) return <p> Error !</p>;
  return (
    <Drawer variant="permanent" {...other}>
      <List disablePadding>
        <ListItem sx={{ ...styles.chat }}>
          <Typography variant="h5">Chats</Typography>
        </ListItem>
        <Box sx={styles.chatList}>
          {chats?.map((chat, i) => {
            return (
              <ListItem disablePadding key={i}>
                <ListItemButton sx={styles.chat}>
                  <IconButton color="inherit" sx={{ p: 0.5 }}>
                    <Avatar src={chatPicture} alt="" />
                  </IconButton>
                  <ChatInfo name={name} />
                </ListItemButton>
                <Divider sx={{ mt: 5 }} />
              </ListItem>
            );
          })}
        </Box>
      </List>
    </Drawer>
  );
}
