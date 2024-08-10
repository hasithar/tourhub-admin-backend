"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Typography, Chip } from "@mui/material";
import DefaultLayout from "@/components/layout/DefaultLayout/DefaultLayout.component";
import withRecordActions from "@/hoc/withActions";
import ContentPanel from "@/components/ui/ContentPanel/ContentPanel.component";
import BlockDescription from "@/components/ui/dataDisplay/BlockDescription/BlockDescription.component";
import BlockContacts from "@/components/ui/dataDisplay/BlockContacts/BlockContacts.component";
import BlockFeatures from "@/components/ui/dataDisplay/BlockFeatures/BlockFeatures.component";
import BlockLocation from "@/components/ui/dataDisplay/BlockLocation/BlockLocation.component";

const ViewAccommodation = () => {
  const [accommodation, setAccommodation] = useState([]);
  const [accommodationType, setAccommodationType] = useState({});
  const [amenities, setAmenities] = useState([]);

  // router
  const router = useRouter();
  const params = useParams();

  // fetch accommodations
  useEffect(() => {
    const fetchAccommodation = async () => {
      const response = await fetch(`/api/accommodations/${params.id}`);
      const data = await response.json();
      setAccommodation(data);
    };

    fetchAccommodation();
  }, [params.id]);

  // fetch accommodation type
  useEffect(() => {
    const fetchAccommodationType = async () => {
      const response = await fetch(
        `/api/accommodation-types/${accommodation.type}`,
      );
      const data = await response.json();
      setAccommodationType(data);
    };

    accommodation?.type && fetchAccommodationType();
  }, [accommodation?.type]);

  // fetch and filter amenities
  useEffect(() => {
    const fetchAmenities = async () => {
      const response = await fetch(`/api/amenities`);
      const data = await response.json();

      const filteredData = await data.filter((item) =>
        accommodation?.amenities.includes(item._id),
      );
      setAmenities(filteredData);
    };

    accommodation?.amenities && fetchAmenities();
  }, [accommodation?.amenities]);

  // record actions
  const RecordActions = withRecordActions([
    {
      label: "Edit",
      onClick: (params) => {
        router.push(`/accommodations/${params._id}/edit`);
      },
    },
    {
      label: "Delete",
      color: "error",
      onClick: (params) => {
        router.push(`/accommodations/${params._id}/delete`);
      },
    },
  ]);

  // const get hote;l rating
  const getRating = () => {
    return ` | ${accomodation?.rating?.starRating} Star ${accommodationType?.name}`;
  };

  return (
    <DefaultLayout
      pageProps={{
        title: accommodation?.name,
        breadcrumbs: [
          { name: "Dashboard", link: "/dashboard" },
          {
            name: "Accommodations",
            link: "/accommodations",
          },
          {
            name: accommodation?.name,
            link: "#",
          },
        ],
      }}
    >
      <ContentPanel
        actions={<RecordActions {...accommodation} />}
        statusDisplay={{
          show: true,
          status: accommodation?.isActive,
          value: accommodation?.isActive
            ? "Active Accommodation"
            : "Inactive Accommodation",
        }}
      >
        <div className="flex flex-row gap-8">
          <div className="content-wrap w-2/3">
            {accommodationType?.name && (
              <BlockDescription
                title="Accommodation Type"
                // description={`${accommodationType?.name} ${accommodation?.rating?.starRating}`}
                description={
                  <Typography component="span">
                    {accommodationType?.name}{" "}
                    {accommodation?.rating?.starRating && (
                      <Chip
                        label={`${accommodation?.rating?.starRating} Star`}
                        size="small"
                        sx={{ fontSize: "0.75rem", ml: 1, mt: "-2px" }}
                      />
                    )}
                  </Typography>
                }
              />
            )}

            {accommodation?.description && (
              <BlockDescription
                title="Description"
                description={accommodation?.description}
              />
            )}

            {accommodation?.amenities && (
              <BlockFeatures title="Amenities" features={amenities} />
            )}

            {accommodation?.contacts && (
              <BlockContacts
                title="Contact Persons"
                contacts={accommodation?.contacts}
              />
            )}
          </div>

          <div className="content-wrap w-1/3">
            {accommodation?.location?.coordinates && (
              <BlockLocation
                title="Location"
                pointName={accommodation?.name}
                location={accommodation?.location}
                contactDetails={[accommodation?.contactDetails]}
              />
            )}
          </div>
        </div>
      </ContentPanel>
    </DefaultLayout>
  );
};

export default ViewAccommodation;
