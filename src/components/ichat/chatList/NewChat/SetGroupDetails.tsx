import React from "react";
//mui
import { List, Button, Typography, Box, TextField, Avatar } from "@mui/material";
import { ArrowBack as ArrowBackIcon } from "@mui/icons-material";

//models
import { User } from "@/models";
//styles
import * as styles from "@/styles/NewChat.style";

interface SetGroupDetailsProps {
  selectedUsers: User[];
  setSlide: React.Dispatch<React.SetStateAction<number>>;
}
function SetGroupDetails({ setSlide, selectedUsers }: SetGroupDetailsProps) {
  return (
    <>
      <Box sx={styles.groupChatHeader}>
        <Button onClick={() => setSlide(0)}>
          <ArrowBackIcon />
        </Button>
        <Typography component={"h4"}>New group</Typography>
      </Box>

      {/* Next and Cancel buttons */}
      {/*Selected users list*/}
      {selectedUsers.length > 0 && (
        <>
          <Box sx={styles.nextCancelButtons}>
            <Button className="next" onClick={() => setSlide(2)}>
              Next
            </Button>
            <Button className="cancel" onClick={() => setSlide(0)}>
              Cancel
            </Button>
          </Box>

          <Box sx={styles.selectedUsers}>
            {selectedUsers.map((user, i) => (
              <Button sx={styles.selectedUser} key={i}>
                {user.name}
              </Button>
            ))}
          </Box>
        </>
      )}
    </>
  );
}

export default SetGroupDetails;
