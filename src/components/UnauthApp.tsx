//@ts-nochec

import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";
import FormLogin from "./FormLogin";
import * as styles from "@/styles/UnauthApp";

interface UnauthAppProps {
  open: boolean;
  handleClose:
    | ((event: {}, reason: "backdropClick" | "escapeKeyDown") => void)
    | undefined;
  signup: boolean;
  login: Function;
  logout: Function;
  register: Function;
  error: any;
  status: string;
}

function UnauthApp({
  open,
  handleClose,
  signup = false,
  login,
  register,
  logout,
  error,
  status,
}: UnauthAppProps) {
  const [create, setCreate] = React.useState(signup);
  const handleSignUp = () => {
    setCreate(true);
  };
  const handleSignIn = () => {
    setCreate(false);
  };
  const label = create ? "Signup" : "Login";

  const spinner =
    status === "fetching " ? (
      <CircularProgress color="secondary" />
    ) : (
      <></>
    );
  return (
    <>
      <Dialog
        sx={styles.dialog}
        style={{ backgroundColor: "transparent" }}
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{label}</DialogTitle>
        <DialogContent>
          <FormLogin
            create={create}
            login={login}
            register={register}
            logout={logout}
          />
          {error ? (
            <Alert severity="error">Erreur : {error.message}</Alert>
          ) : null}
        </DialogContent>
        <DialogActions style={{ justifyContent: "flex-start" }}>
          {!create ? (
            <Button onClick={handleSignUp} sx={styles.actionText}>
              New on Ichat ? {spinner}
            </Button>
          ) : (
            <Button
              onClick={handleSignIn}
              autoFocus
              sx={styles.actionText}
            >
              Already have an account ? {spinner}
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </>
  );
}
export default UnauthApp;
