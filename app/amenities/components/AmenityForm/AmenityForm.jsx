import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  TextField,
  Box,
  FormGroup,
  FormControlLabel,
  Switch,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import useApiRequest from "@/hooks/useApiRequest.hook";
import StatusAlert from "@/components/ui/StatusAlert/StatusAlert.component";

const AmenityForm = (props) => {
  const { type = "create", data, refetchData } = props;
  const recordType = "Amenity";

  const { loading, error, success, makeRequest } = useApiRequest();
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);

  // form setup
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm();

  // handle submit
  const onSubmit = async (data) => {
    if (type === "create") {
      createRecord(data);
    }
    if (type === "edit") {
      EditRecord(data);
    }
  };

  // create record
  const createRecord = async (formData) => {
    try {
      await makeRequest(`/api/amenities`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
    } catch (err) {
      console.error("Error during request:", err);
    }
  };

  // edit record
  const EditRecord = async (formData) => {
    try {
      await makeRequest(`/api/amenities/${data?._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
    } catch (err) {
      console.error("Error during request:", err);
    } finally {
      refetchData();
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

  // update default values
  useEffect(() => {
    if (data) {
      reset({
        name: data?.name || "",
        description: data?.description || "",
        isActive: data?.isActive || false,
      });
    }
  }, [data, reset]);

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
        message={`${recordType} ${type === "edit" ? "updated" : "created"} successfully!`}
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
          InputLabelProps={data?.name ? { shrink: true } : null}
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
          InputLabelProps={data?.description ? { shrink: true } : null}
        />

        <FormGroup sx={{ mt: 3, mb: 2 }}>
          <Controller
            name="isActive"
            control={control}
            render={({ field }) => (
              <FormControlLabel
                control={
                  <Switch
                    {...field}
                    checked={field.value}
                    onChange={(e) => field.onChange(e.target.checked)}
                  />
                }
                label="Active"
              />
            )}
          />
        </FormGroup>

        <LoadingButton
          loading={loading}
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          size="large"
          sx={{ mt: 2 }}
        >
          {loading
            ? "Submitting..."
            : `${type === "edit" ? "Update" : "Create"} ${recordType}`}
        </LoadingButton>
      </Box>
    </>
  );
};

export default AmenityForm;
