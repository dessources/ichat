import React from "react";
//models
import { Chat, ChatUsers } from "@/models";
//mui
import { Modal, Box, Avatar, Typography } from "@mui/material";

//styles
import * as styles from "@/styles/Profile.style";
import useAppContext from "@/hooks/useAppContext";
import { ChatContext, ChatUsersContext, UserContext } from "@/contexts";

function ChatProfile({ open, setOpen }: any) {
  const [user] = useAppContext(UserContext);
  const [currentChat] = useAppContext(ChatContext) as [Chat];
  const [chatUsers] = useAppContext(ChatUsersContext) as [ChatUsers];

  const currentChatUsers = chatUsers?.[currentChat?.id];
  // const otherUsers = currentChat.users.filter((id) => id !== user?.id);

  const handleClose = React.useCallback(async () => {
    setOpen(false);
  }, [setOpen]);

  console.log(currentChatUsers);

  return (
    <Modal
      open={open}
      sx={styles.chatProfileModal}
      onClose={handleClose}
      slots={{ backdrop: Backdrop }}
    >
      <Box sx={styles.profileBox} className="profileBox">
        <Avatar src={currentChat?.chatPicture} alt="My Avatar" sx={styles.avatar}>
          {currentChat?.name?.charAt(0)}
        </Avatar>

        {/*name section */}
        <Box sx={styles.textEditable}>
          <Typography sx={styles.name}>{currentChat.name}</Typography>
        </Box>

        {/*
  // TODO: display the username of the chat corespondent(s)
 // TODO: And the about text if there is only one other corespondent */}
        {/*About section */}
        {!currentChat.group && (
          <Box sx={styles.info}>
            <Typography component={"span"}>About</Typography>
            <Box sx={styles.textEditable}>{currentChatUsers?.[0].about}</Box>
          </Box>
        )}

        {/*username section*/}
        {currentChat.group ? (
          <Box sx={styles.info}>
            <Typography component={"span"}>Participants</Typography>
            {currentChatUsers?.map((user, i) => (
              <Typography key={i}>{user.username}</Typography>
            ))}
          </Box>
        ) : (
          <Box sx={styles.info}>
            <Typography component={"span"}>Username</Typography>
            <Typography>{currentChatUsers?.[0].username}</Typography>
          </Box>
        )}
      </Box>
    </Modal>
  );
}

function Backdrop(props: any) {
  const { ownerState, ...rest } = props;
  return <Box style={styles.modalBackdrop} {...rest} />;
}
export default ChatProfile;
