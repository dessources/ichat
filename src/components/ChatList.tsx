import * as React from "react";
import Image from "next/image";
import Divider from "@mui/material/Divider";
import Drawer, { DrawerProps } from "@mui/material/Drawer";
import List from "@mui/material/List";
import Box from "@mui/material/Box";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import { Avatar, IconButton, Typography } from "@mui/material";
import ListItemText from "@mui/material/ListItemText";
import DnsRoundedIcon from "@mui/icons-material/DnsRounded";

//my components
import ChatInfo from "./ChatInfo";
//styles
import * as styles from "@/styles/ChatList.style";

const chats = [
  {
    name: "Jean-Jacques",
    profilePicture: "someurl",
    online: true,
  },
  { name: "Norie", online: false, profilePicture: "someurl" },
  { name: "Anderson", online: false, profilePicture: "someurl" },
];

export default function ChatList(props: DrawerProps) {
  const { ...other } = props;

  return (
    <Drawer variant="permanent" {...other}>
      <List disablePadding>
        <ListItem sx={{ ...styles.chat }}>
          <Typography variant="h5">Chats</Typography>
        </ListItem>
        <Box sx={styles.chatList}>
          {chats.map(({ name, profilePicture }, i) => (
            <ListItem disablePadding key={i}>
              <ListItemButton sx={styles.chat}>
                <IconButton color="inherit" sx={{ p: 0.5 }}>
                  <Avatar
                    src="/static/images/avatar/1.jpg"
                    alt={`Avatar of ${name}`}
                  />
                </IconButton>
                <ChatInfo name={name} />
              </ListItemButton>
              <Divider sx={{ mt: 5 }} />
            </ListItem>
          ))}
        </Box>
      </List>
    </Drawer>
  );
}
