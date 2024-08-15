import React from "react";
import { Snackbar, Alert, AlertTitle } from "@mui/material";

const StatusAlert = (props) => {
  const { open, onClose, title, message, severity } = props;

  return (
    <>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={onClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={onClose}
          severity={severity}
          variant="filled"
          sx={{ width: "100%", color: "#fff", textAlign: "left" }}
        >
          {title && <AlertTitle>{title}</AlertTitle>}
          {message && message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default StatusAlert;
