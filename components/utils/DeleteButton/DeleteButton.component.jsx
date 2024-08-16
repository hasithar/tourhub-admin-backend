import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import useApiRequest from "@/hooks/useApiRequest.hook";
import StatusAlert from "@/components/ui/StatusAlert/StatusAlert.component";

const DeleteButton = (props) => {
  const { endpoint, item, redirect } = props;
  const { loading, error, success, makeRequest } = useApiRequest();

  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [open, setOpen] = React.useState(false);

  const router = useRouter();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason !== "backdropClick") {
      setOpen(false);
    }
  };

  // delete item
  const delteItem = async (endpoint, identifier) => {
    try {
      await makeRequest(`/api/${endpoint}/${identifier}`, {
        method: "DELETE",
      });
    } catch (err) {
      console.error("Error during request:", err);
    }
  };

  // handle success
  useEffect(() => {
    const handleSuccess = () => {
      if (success && success !== "") {
        setShowSuccess(true);
      } else {
        setShowSuccess(false);
      }
    };
    handleSuccess();
  }, [success]);

  // handle error
  useEffect(() => {
    const handleError = () => {
      if (error && error?.error !== "") {
        setShowError(true);
      } else {
        setShowError(false);
      }
    };
    handleError();
  }, [error]);

  return (
    <>
      <div className="py-3">
        <Button
          variant="contained"
          color="error"
          size="small"
          onClick={handleClickOpen}
          sx={{
            fontSize: "0.7rem",
            padding: "0.4rem 0.6rem",
            minWidth: "unset",
          }}
        >
          Delete
        </Button>
      </div>

      <StatusAlert
        open={showSuccess}
        onClose={() => {
          setShowSuccess(false);
          router.push(redirect);
        }}
        severity="success"
        title="Success"
        message={`${item?.name} deleted successfully!`}
      />

      <StatusAlert
        open={showError}
        onClose={() => setShowError(false)}
        severity="error"
        title={error?.error}
        message={error?.reason}
      />

      <Dialog
        open={open}
        onClose={handleClose}
        disableEscapeKeyDown
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle>Confirm delete item?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Do you really want to delete {item?.name}? <br />
            This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              delteItem(endpoint, item?.id);
              handleClose();
            }}
          >
            Delete Item
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DeleteButton;
