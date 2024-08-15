import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { TextField, Box } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import useApiRequest from "@/hooks/useApiRequest.hook";
import StatusAlert from "@/components/ui/StatusAlert/StatusAlert.component";

const AccommodationTypeForm = (props) => {
  const { type = "create", data = {} } = props;
  const { loading, error, success, makeRequest } = useApiRequest();
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);

  // submit form
  const onSubmit = async (data) => {
    try {
      await makeRequest("/api/accommodation-types", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
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

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  return (
    <>
      <StatusAlert
        open={showSuccess}
        onClose={() => {
          setShowSuccess(false);
          reset();
        }}
        severity="success"
        title="Success"
        message="Accommodation type created successfully!"
      />
      <StatusAlert
        open={showError}
        onClose={() => setShowError(false)}
        severity="error"
        title={error?.error}
        message={error?.reason}
      />

      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        <TextField
          label="Name"
          fullWidth
          margin="normal"
          {...register("name", { required: "Name is required" })}
          error={!!errors.name}
          helperText={errors.name ? errors.name.message : ""}
          variant="standard"
          size="small"
        />
        <TextField
          label="Description"
          fullWidth
          margin="normal"
          multiline
          rows={4}
          {...register("description", {
            required: "Description is required",
            minLength: {
              value: 10,
              message: "Description must be at least 10 characters",
            },
          })}
          error={!!errors.description}
          helperText={errors.description ? errors.description.message : ""}
          variant="standard"
          size="small"
        />
        <LoadingButton
          loading={loading}
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          size="large"
          sx={{ mt: 2 }}
        >
          {loading ? "Submitting..." : "Create Accommodation Type"}
        </LoadingButton>
      </Box>
    </>
  );
};

export default AccommodationTypeForm;
