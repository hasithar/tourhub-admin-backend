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
import BlockGallery from "@/components/ui/dataDisplay/BlockGallery/BlockGallery.component";

const ViewAttraction = () => {
  const [attraction, setAttraction] = useState([]);
  const [attractionType, setAttractionType] = useState({});

  // router
  const router = useRouter();
  const params = useParams();

  // fetch attraction
  useEffect(() => {
    const fetchAttraction = async () => {
      const response = await fetch(`/api/attractions/${params.id}`);
      const data = await response.json();
      setAttraction(data);
    };

    fetchAttraction();
  }, [params.id]);

  // fetch attraction type
  useEffect(() => {
    const fetchAttractionType = async () => {
      const response = await fetch(
        `/api/attraction-types/${attraction?.category}`,
      );
      const data = await response.json();
      setAttractionType(data);
    };

    attraction?.category && fetchAttractionType();
  }, [attraction?.category]);

  // record actions
  const RecordActions = withRecordActions([
    {
      label: "Edit",
      onClick: (params) => {
        router.push(`/attractions/${params._id}/edit`);
      },
    },
    {
      label: "Delete",
      color: "error",
      onClick: (params) => {
        router.push(`/attractions/${params._id}/delete`);
      },
    },
  ]);

  return (
    <DefaultLayout
      pageProps={{
        title: attraction?.name,
        breadcrumbs: [
          { name: "Dashboard", link: "/dashboard" },
          {
            name: "Attractions",
            link: "/attractions",
          },
          {
            name: attraction?.name,
            link: "#",
          },
        ],
      }}
    >
      <ContentPanel
        actions={<RecordActions {...attraction} />}
        statusDisplay={{
          show: true,
          status: attraction?.isActive,
          value: attraction?.isActive
            ? "Active Attraction"
            : "Inactive Attraction",
        }}
      >
        <div className="flex flex-row gap-8">
          <div className="content-wrap w-2/3">
            {attractionType?.name && (
              <BlockDescription
                title="Attraction Type"
                description={`${attractionType?.name} `}
              />
            )}

            {attraction?.description && (
              <BlockDescription
                title="Description"
                description={attraction?.description}
              />
            )}

            {attraction?.contacts && (
              <BlockContacts
                title="Contact Persons"
                contacts={attraction?.contacts}
              />
            )}

            {attraction?.images && (
              <BlockGallery
                title="Images"
                images={attraction?.images}
                name={attraction?.name}
              />
            )}
          </div>

          <div className="content-wrap w-1/3">
            {attraction?.location?.coordinates && (
              <BlockLocation
                title="Location"
                pointName={attraction?.name}
                location={attraction?.location}
                contactDetails={[attraction?.contactDetails]}
              />
            )}
          </div>
        </div>
      </ContentPanel>
    </DefaultLayout>
  );
};

export default ViewAttraction;
