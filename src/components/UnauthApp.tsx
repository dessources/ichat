import React from "react";

// context
import { UserContext } from "@/pages/index";

//material ui
import { ThemeProvider } from "@mui/material/styles";
import Button from "@mui/material/Button";
import { Typography, Box } from "@mui/material";
import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";
import FormLogin from "./FormLogin";

//styles
import theme from "@/themes/ichat";
import * as styles from "@/styles/UnauthApp.style";

// services  & utils
import autoLogin from "@/utils/autoLogin";

function UnauthApp() {
  const [create, setCreate] = React.useState(false);
  const [error, setError] = React.useState<Error>();
  const [status, setStatus] = React.useState<"fetching" | "done" | "idle">("idle");
  const userContext = React.useContext(UserContext);

  //try login in directly with refresh token
  React.useEffect(() => {
    autoLogin().then((accessToken) => userContext?.setUser(accessToken));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSignUp = () => {
    setCreate(true);
  };
  const handleSignIn = () => {
    setCreate(false);
  };
  const label = create ? "Signup" : "Login";

  const spinner =
    status === "fetching" ? (
      <CircularProgress color="primary" style={styles.progress} />
    ) : (
      <></>
    );
  return (
    <ThemeProvider theme={theme}>
      <Box sx={styles.dialog}>
        <Typography id="alert-dialog-title" variant="h5" color="primary">
          {label}
        </Typography>
        <Box sx={styles.dialogContent}>
          <FormLogin create={create} setError={setError} setStatus={setStatus} />
          {error ? (
            <Alert severity="error">
              <>Error : {error.message}</>
            </Alert>
          ) : null}
        </Box>
        <Box sx={styles.dialogActions}>
          {!create ? (
            <Button onClick={handleSignUp} color="primary">
              New on Ichat ? {spinner}
            </Button>
          ) : (
            <Button onClick={handleSignIn} autoFocus color="primary">
              Already have an account ? {spinner}
            </Button>
          )}
        </Box>
      </Box>
    </ThemeProvider>
  );
}
export default UnauthApp;
