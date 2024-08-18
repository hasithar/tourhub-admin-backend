import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  TextField,
  Box,
  FormGroup,
  FormControlLabel,
  Switch,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  ListItemText,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import useApiRequest from "@/hooks/useApiRequest.hook";
import StatusAlert from "@/components/ui/StatusAlert/StatusAlert.component";
import BlockFeatures from "@/components/ui/dataDisplay/BlockFeatures/BlockFeatures.component";

const AccommodationForm = (props) => {
  const { type = "create", data, refetchData, refData } = props;
  const { accommodationTypes, amenities } = refData;
  const recordType = "Accommodation";

  const { loading, error, success, makeRequest } = useApiRequest();
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [selectedAmenities, setSelectedAmenities] = useState(
    data?.amenities || [],
  );
  console.log("🚀 ~ AccommodationForm ~ selectedAmenities:", selectedAmenities);
  // form setup
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      location: {
        coordinates: {
          type: "Point",
        },
      },
    },
  });

  // handle submit
  const onSubmit = async (data) => {
    console.log("🚀 ~ onSubmit ~ data:", data);
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
      await makeRequest(`/api/accommodations`, {
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
      await makeRequest(`/api/accommodations/${data?._id}`, {
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
        type: data?.type || "",
        isActive: data?.isActive || false,
        contactDetails: {
          phone: data?.contactDetails?.phone || "",
          email: data?.contactDetails?.email || "",
          website: data?.contactDetails?.email || "",
        },
        location: {
          address: data?.location?.address || "",
          city: data?.location?.city || "",
          province: data?.location?.province || "",
          postalCode: data?.location?.postalCode || "",
          country: data?.location?.country || "",
          coordinates: {
            coordinates: data?.location?.coordinates?.coordinates || [],
          },
        },
        rating: {
          starRating: data?.rating?.starRating || "",
        },
        amenities: data?.amenities || [],
      });
    }
  }, [data, reset]);

  const handleSelectChange = (event) => {
    const {
      target: { value },
    } = event;
    setSelectedAmenities(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value,
    );
  };

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

      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        className="text-left"
      >
        <div className="flex flex-row justify-between gap-8">
          <div className="flex w-1/3 flex-col flex-wrap gap-0">
            <h4 className="font-semibold text-black dark:text-white">
              Basic Information:
            </h4>
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

            <div className="flex flex-row justify-between gap-8">
              <FormControl margin="normal" className="w-1/2">
                <InputLabel sx={{ ml: -1.75 }}>Accommodation Type</InputLabel>
                <Select
                  label="Accommodation Type"
                  fullWidth
                  variant="standard"
                  size="small"
                  {...register("type", {
                    required: "Accommodations Type is required",
                  })}
                  error={!!errors.type}
                  helperText={errors.type ? errors.type.message : ""}
                  InputLabelProps={data?.type ? { shrink: true } : null}
                >
                  {accommodationTypes?.length > 0 &&
                    accommodationTypes?.map((accommodationType) => (
                      <MenuItem
                        key={accommodationType?._id}
                        value={accommodationType?._id}
                      >
                        {accommodationType?.name}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>

              <FormControl margin="normal" className="w-1/2">
                <InputLabel sx={{ ml: -1.75 }}>Star Rating</InputLabel>
                <Select
                  label="Star Rating"
                  fullWidth
                  variant="standard"
                  size="small"
                  {...register("rating.starRating", {})}
                  error={!!errors.rating?.starRating}
                  helperText={
                    errors.rating?.starRating
                      ? errors.rating?.starRating.message
                      : ""
                  }
                  InputLabelProps={
                    data?.rating?.starRating ? { shrink: true } : null
                  }
                >
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <MenuItem key={rating} value={rating}>
                      {rating} Star
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>

            <TextField
              label="Description"
              fullWidth
              margin="normal"
              multiline
              rows={6}
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

            <h4 className="mb-4 mt-12 font-semibold text-black dark:text-white">
              Facilities:
            </h4>
            <FormControl fullWidth margin="normal">
              <InputLabel sx={{ ml: -1.75 }}>Amenities</InputLabel>
              <Controller
                name="amenities"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    fullWidth
                    variant="standard"
                    size="small"
                    multiple
                    value={selectedAmenities}
                    onChange={(e) => {
                      handleSelectChange(e);
                      field.onChange(e.target.value);
                    }}
                    renderValue={(selected) =>
                      selected
                        .map(
                          (value) =>
                            amenities.find((a) => a._id === value)?.name,
                        )
                        .join(", ")
                    }
                    error={!!errors.amenities}
                  >
                    {amenities?.length > 0 &&
                      amenities?.map((amenity) => (
                        <MenuItem key={amenity?._id} value={amenity?._id}>
                          <Checkbox
                            checked={
                              selectedAmenities.indexOf(amenity?._id) > -1
                            }
                          />
                          <ListItemText primary={amenity?.name} />
                        </MenuItem>
                      ))}
                  </Select>
                )}
              />
              {errors.amenities && (
                <p style={{ color: "red" }}>{errors.amenities.message}</p>
              )}
            </FormControl>
            <div
              className={`${selectedAmenities.length > 0 ? "mt-4 h-auto" : "h-0"} `}
            >
              <BlockFeatures
                features={amenities.filter((a) =>
                  selectedAmenities.includes(a?._id),
                )}
              />
            </div>
          </div>

          <div className="flex w-1/3 flex-col flex-wrap gap-0">
            <h4 className="font-semibold text-black dark:text-white">
              Location:
            </h4>
            <TextField
              label="Address"
              fullWidth
              margin="normal"
              {...register("location.address", {
                required: "Address is required",
                maxLength: {
                  value: 100,
                  message: "Address must be at most 100 characters",
                },
              })}
              error={!!errors.location?.address}
              helperText={errors.location?.address?.message || ""}
              variant="standard"
              size="small"
              InputLabelProps={
                data?.location?.address ? { shrink: true } : null
              }
            />
            <TextField
              label="City"
              fullWidth
              margin="normal"
              {...register("location.city", {
                required: "City is required",
                maxLength: {
                  value: 100,
                  message: "City must be at most 100 characters",
                },
              })}
              error={!!errors.location?.city}
              helperText={errors.location?.city?.message || ""}
              variant="standard"
              size="small"
              InputLabelProps={data?.location?.city ? { shrink: true } : null}
            />
            <div className="flex flex-row justify-between gap-8">
              <TextField
                label="Province"
                fullWidth
                margin="normal"
                {...register("location.province", {
                  required: "Province is required",
                  maxLength: {
                    value: 100,
                    message: "Province must be at most 100 charactesrs",
                  },
                })}
                error={!!errors.location?.province}
                helperText={errors.location?.province?.message || ""}
                variant="standard"
                size="small"
                InputLabelProps={
                  data?.location?.province ? { shrink: true } : null
                }
              />
              <TextField
                label="Postal Code"
                fullWidth
                margin="normal"
                {...register("location.postalCode", {
                  required: "Postal Code is required",
                  maxLength: {
                    value: 30,
                    message: "Postal Code must be at most 30 characters",
                  },
                })}
                error={!!errors.location?.postalCode}
                helperText={errors.location?.postalCode?.message || ""}
                variant="standard"
                size="small"
                InputLabelProps={
                  data?.location?.postalCode ? { shrink: true } : null
                }
              />
            </div>
            <TextField
              label="Country"
              fullWidth
              margin="normal"
              {...register("location.country", {
                required: "Country is required",
                maxLength: {
                  value: 100,
                  message: "Country must be at most 100 characters",
                },
              })}
              error={!!errors.location?.country}
              helperText={errors.location?.country?.message || ""}
              variant="standard"
              size="small"
              InputLabelProps={
                data?.location?.country ? { shrink: true } : null
              }
            />
            <div className="flex flex-row justify-between gap-8">
              <TextField
                label="Longitude"
                fullWidth
                margin="normal"
                {...register("location.coordinates.coordinates.0", {
                  required: "Longitude is required",
                  valueAsNumber: true,
                  validate: (value) =>
                    !isNaN(value) || "Longitude must be a number",
                })}
                error={!!errors.location?.coordinates?.coordinates?.[0]}
                helperText={
                  errors.location?.coordinates?.coordinates?.[0]?.message || ""
                }
                variant="standard"
                size="small"
                InputLabelProps={
                  data?.location?.coordinates?.coordinates?.[0]
                    ? { shrink: true }
                    : null
                }
              />
              <TextField
                label="Latitude"
                fullWidth
                margin="normal"
                {...register("location.coordinates.coordinates.1", {
                  required: "Latitude is required",
                  valueAsNumber: true,
                  validate: (value) =>
                    !isNaN(value) || "Latitude must be a number",
                })}
                error={!!errors.location?.coordinates?.coordinates?.[1]}
                helperText={
                  errors.location?.coordinates?.coordinates?.[1]?.message || ""
                }
                variant="standard"
                size="small"
                InputLabelProps={
                  data?.location?.coordinates?.coordinates?.[1]
                    ? { shrink: true }
                    : null
                }
              />
            </div>
          </div>

          <div className="flex w-1/3 flex-col flex-wrap gap-0">
            <h4 className="font-semibold text-black dark:text-white">
              Contact Details:
            </h4>
            <TextField
              label="Phone"
              fullWidth
              margin="normal"
              {...register("contactDetails.phone", {
                required: "Phone number is required",
                minLength: {
                  value: 10,
                  message: "Phone number must be at least 10 digits",
                },
                maxLength: {
                  value: 15,
                  message: "Phone number must be at most 15 digits",
                },
              })}
              error={!!errors.contactDetails?.phone}
              helperText={errors.contactDetails?.phone?.message || ""}
              variant="standard"
              size="small"
              InputLabelProps={
                data?.contactDetails?.phone ? { shrink: true } : null
              }
            />

            <TextField
              label="Email"
              fullWidth
              margin="normal"
              {...register("contactDetails.email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Enter a valid email address",
                },
              })}
              error={!!errors.contactDetails?.email}
              helperText={errors.contactDetails?.email?.message || ""}
              variant="standard"
              size="small"
              InputLabelProps={
                data?.contactDetails?.email ? { shrink: true } : null
              }
            />

            <TextField
              label="Website"
              fullWidth
              margin="normal"
              {...register("contactDetails.website", {
                pattern: {
                  value: /^(https?:\/\/)?([\w\d-]+\.)+[\w-]+(\/[\w-]*)*\/?$/,
                  message: "Enter a valid website URL",
                },
              })}
              error={!!errors.contactDetails?.website}
              helperText={errors.contactDetails?.website?.message || ""}
              variant="standard"
              size="small"
              InputLabelProps={
                data?.contactDetails?.website ? { shrink: true } : null
              }
            />

            <div className="flex-1"></div>

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
          </div>
        </div>
      </Box>
    </>
  );
};

export default AccommodationForm;

/*





// define contacts schema
const contactSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: false },
    phone: { type: String, required: false },
    role: { type: String, required: true },
    remarks: { type: String },
  },
  { _id: false }
);

// define accomodation schema
const accommodationSchema = new Schema(
  {

 

 
  
    contacts: [contactSchema],
    amenities: [
      {
        type: Schema.Types.ObjectId,
        ref: "Amenity",
      },
    ],


  },
  {
    timestamps: true,
  }
);

// create 2dsphere index on the location.coordinates for geospatial queries
accommodationSchema.index({ "location.coordinates": "2dsphere" });

// create accommodation model
const Accommodation = mongoose.model("Accommodation", accommodationSchema);

module.exports = Accommodation;


*/
