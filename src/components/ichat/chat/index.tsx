import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import RefreshIcon from "@mui/icons-material/Refresh";
import useAppContext from "@/hooks/useAppContext";
import { ChatContext } from "@/contexts";

export default function Chat() {
  const [currentChat] = useAppContext(ChatContext);
  const messages = [
    { userId: 1, message: "Hey, have you used TypeScript before?" },
    {
      userId: 2,
      message:
        "Yes, I've used it on a few projects. It's great for catching errors early.",
    },
    {
      userId: 1,
      message:
        "That's what I've heard. I'm thinking about using it for my next project.",
    },
    {
      userId: 2,
      message:
        "Definitely give it a try. It can take some getting used to, but it's worth it in the end.",
    },
    {
      userId: 1,
      message: "Thanks for the advice. I'll let you know how it goes!",
    },
    { userId: 2, message: "No problem, happy to help!" },
    {
      userId: 1,
      message: "Have you used any TypeScript libraries that you'd recommend?",
    },
    {
      userId: 2,
      message:
        "Definitely check out React with TypeScript. It's a great combination.",
    },
    { userId: 1, message: "I'll look into it. Thanks!" },
    {
      userId: 2,
      message: "You're welcome. Let me know if you have any other questions.",
    },
    {
      userId: 1,
      message: "Actually, do you have any good resources for learning TypeScript?",
    },
    {
      userId: 2,
      message:
        "Sure, I'd recommend the official TypeScript documentation and the TypeScript Handbook.",
    },
    { userId: 1, message: "Thanks, I'll check those out." },
    {
      userId: 2,
      message:
        "No problem. TypeScript can be a bit overwhelming at first, but it's worth the effort.",
    },
    { userId: 1, message: "I'm excited to learn it. Thanks again for your help!" },
    {
      userId: 2,
      message: "Of course, happy to help. Good luck with your TypeScript journey!",
    },
    { userId: 1, message: "Thanks, talk to you later!" },
    { userId: 2, message: "See you later!" },
    { userId: 1, message: "Hey, are you still there?" },
    { userId: 2, message: "Yes, I'm still here. What's up?" },
  ];
  return (
    <div>
      {currentChat?.name}

      <ul style={{ display: "flex", flexDirection: "column", rowGap: "0.3rem" }}>
        {messages.map((message, i) => (
          <li
            key={i}
            style={{
              alignSelf: message.userId === 1 ? "flex-start" : "flex-end",

              listStyleType: "none",
              padding: "0.5rem 0.3rem",
              background: message.userId === 1 ? "#545454" : "#035d4d",
              width: "fit-content",
              borderRadius: " 3px",
            }}
          >
            {message.message}
          </li>
        ))}
      </ul>
    </div>
    // <Paper
    //   sx={{
    //     maxWidth: 936,
    //     margin: "auto",
    //     overflow: "hidden",
    //     bgcolor: "transparent",
    //   }}
    // >
    //   <AppBar
    //     position="static"
    //     color="default"
    //     elevation={0}
    //     sx={{ borderBottom: "1px solid rgba(0, 0, 0, 0.12)" }}
    //   >
    //     <Toolbar>
    //       <Grid container spacing={2} alignItems="center">
    //         <Grid item>
    //           <SearchIcon color="inherit" sx={{ display: "block" }} />
    //         </Grid>
    //         <Grid item xs>
    //           <TextField
    //             fullWidth
    //             placeholder="Search by email address, phone number, or user UID"
    //             InputProps={{
    //               disableUnderline: true,
    //               sx: { fontSize: "default" },
    //             }}
    //             variant="standard"
    //           />
    //         </Grid>
    //         <Grid item>
    //           <Button variant="contained" sx={{ mr: 1 }}>
    //             Add user
    //           </Button>
    //           <Tooltip title="Reload">
    //             <IconButton>
    //               <RefreshIcon color="inherit" sx={{ display: "block" }} />
    //             </IconButton>
    //           </Tooltip>
    //         </Grid>
    //       </Grid>
    //     </Toolbar>
    //   </AppBar>
    //   <Typography sx={{ my: 5, mx: 2 }} color="text.secondary" align="center">
    //     No users for this project yet
    //   </Typography>
    // </Paper>
  );
}
