import React from "react";
import { ThemeProvider } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";
import FormLogin from "./FormLogin";
import theme from "@/themes/ichat";
import * as styles from "@/styles/UnauthApp.style";

function UnauthApp() {
  const [create, setCreate] = React.useState(false);
  const [open, setOpen] = React.useState(true);
  const [error, setError] = React.useState<Error>();
  const [status, setStatus] = React.useState<"fetching" | "done" | "idle">("idle");

  const handleSignUp = () => {
    setCreate(true);
  };
  const handleSignIn = () => {
    setCreate(false);
  };
  const handleClose = () => {};
  const label = create ? "Signup" : "Login";

  const spinner =
    status === "fetching" ? (
      <CircularProgress color="primary" style={styles.progress} />
    ) : (
      <></>
    );
  return (
    <ThemeProvider theme={theme}>
      <Dialog
        sx={styles.dialog}
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" color="primary">
          {label}
        </DialogTitle>
        <DialogContent sx={styles.dialogContent}>
          <FormLogin create={create} setError={setError} setStatus={setStatus} />
          {error ? (
            <Alert severity="error">
              <>Error : {error.message}</>
            </Alert>
          ) : null}
        </DialogContent>
        <DialogActions style={{ justifyContent: "flex-start" }}>
          {!create ? (
            <Button onClick={handleSignUp} color="primary">
              New on Ichat ? {spinner}
            </Button>
          ) : (
            <Button onClick={handleSignIn} autoFocus color="primary">
              Already have an account ? {spinner}
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </ThemeProvider>
  );
}
export default UnauthApp;
