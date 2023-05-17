import React from "react";
//models

//mui
import { Modal, Box, Avatar, Typography } from "@mui/material";

//styles
import * as styles from "@/styles/Profile.style";
import useAppContext from "@/hooks/useAppContext";
import { UserContext } from "@/contexts";

function ChatProfile({ open, setOpen }: any) {
  const [user, setUser] = useAppContext(UserContext);

  const handleClose = React.useCallback(async () => {
    setOpen(false);
  }, [setOpen]);

  return (
    <Modal
      open={open}
      sx={styles.chatProfileModal}
      onClose={handleClose}
      slots={{ backdrop: Backdrop }}
    >
      <Box sx={styles.profileBox} className="profileBox">
        <Avatar src={user?.profilePicture} alt="My Avatar" sx={styles.avatar}>
          {user?.name.charAt(0)}
        </Avatar>

        {/*name section */}
        <Box sx={styles.textEditable}>
          {/* <input
            type="text"
            value={updatedInfo.name}
           
            disabled
            style={{ fontSize: "20px" }}
          />
       */}
        </Box>

        {/*About section */}
        <Box sx={styles.info}>
          <Typography component={"span"}>About</Typography>
          <Box sx={styles.textEditable}></Box>
        </Box>

        {/*username section*/}
        <Box sx={styles.info}>
          <Typography component={"span"}>Username</Typography>
          <Typography>{user?.username}</Typography>
        </Box>
      </Box>
    </Modal>
  );
}

function Backdrop(props: any) {
  const { ownerState, ...rest } = props;
  return <Box style={styles.modalBackdrop} {...rest} />;
}
export default ChatProfile;
