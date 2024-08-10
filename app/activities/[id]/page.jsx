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

const ViewActivity = () => {
  const [activity, setActivity] = useState([]);
  const [activityType, setActivityType] = useState({});
  const [amenities, setAmenities] = useState([]);

  // router
  const router = useRouter();
  const params = useParams();

  // fetch activity
  useEffect(() => {
    const fetchActivity = async () => {
      const response = await fetch(`/api/activities/${params.id}`);
      const data = await response.json();
      setActivity(data);
    };

    fetchActivity();
  }, [params.id]);

  // fetch activity type
  useEffect(() => {
    const fetchActivityType = async () => {
      const response = await fetch(`/api/activity-types/${activity?.category}`);
      const data = await response.json();
      setActivityType(data);
    };

    activity?.category && fetchActivityType();
  }, [activity?.category]);

  // // fetch and filter amenities
  // useEffect(() => {
  //   const fetchAmenities = async () => {
  //     const response = await fetch(`/api/amenities`);
  //     const data = await response.json();

  //     const filteredData = await data.filter((item) =>
  //       activity?.amenities.includes(item._id),
  //     );
  //     setAmenities(filteredData);
  //   };

  //   activity?.amenities && fetchAmenities();
  // }, [activity?.amenities]);

  // record actions
  const RecordActions = withRecordActions([
    {
      label: "Edit",
      onClick: (params) => {
        router.push(`/activities/${params._id}/edit`);
      },
    },
    {
      label: "Delete",
      color: "error",
      onClick: (params) => {
        router.push(`/activities/${params._id}/delete`);
      },
    },
  ]);

  // {

  //     "images": [
  //         "https://example.com/mirissa1.jpg",
  //         "https://example.com/mirissa2.jpg"
  //     ],

  // }

  return (
    <DefaultLayout
      pageProps={{
        title: activity?.name,
        breadcrumbs: [
          { name: "Dashboard", link: "/dashboard" },
          {
            name: "Activities",
            link: "/activities",
          },
          {
            name: activity?.name,
            link: "#",
          },
        ],
      }}
    >
      <ContentPanel
        actions={<RecordActions {...activity} />}
        statusDisplay={{
          show: true,
          status: activity?.isActive,
          value: activity?.isActive ? "Active Activity" : "Inactive Activity",
        }}
      >
        <div className="flex flex-row gap-8">
          <div className="content-wrap w-2/3">
            {activityType?.name && (
              <BlockDescription
                title="Activity Type"
                description={`${activityType?.name} `}
              />
            )}

            {activity?.description && (
              <BlockDescription
                title="Description"
                description={activity?.description}
              />
            )}

            {activity?.contacts && (
              <BlockContacts
                title="Contact Persons"
                contacts={activity?.contacts}
              />
            )}

            {activity?.images && (
              <BlockGallery
                title="Images"
                images={activity?.images}
                name={activity?.name}
              />
            )}
          </div>

          <div className="content-wrap w-1/3">
            {activity?.location?.coordinates && (
              <BlockLocation
                title="Location"
                pointName={activity?.name}
                location={activity?.location}
                contactDetails={[activity?.contactDetails]}
              />
            )}
          </div>
        </div>
      </ContentPanel>
    </DefaultLayout>
  );
};

export default ViewActivity;
