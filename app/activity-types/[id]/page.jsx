"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import DefaultLayout from "@/components/layout/DefaultLayout/DefaultLayout.component";
import withRecordActions from "@/hoc/withActions";
import ContentPanel from "@/components/ui/ContentPanel/ContentPanel.component";
import BlockDescription from "@/components/ui/dataDisplay/BlockDescription/BlockDescription.component";

const ViewActivityType = () => {
  const [activityType, setActivityType] = useState([]);

  // router
  const router = useRouter();
  const params = useParams();

  // fetch data
  useEffect(() => {
    const fetchActivityType = async () => {
      const response = await fetch(`/api/activity-types/${params.id}`);
      const data = await response.json();
      setActivityType(data);
    };

    fetchActivityType();
  }, [params.id]);

  // record actions
  const RecordActions = withRecordActions([
    {
      label: "Edit",
      onClick: (params) => {
        router.push(`/activity-types/${params._id}/edit`);
      },
    },
    {
      label: "Delete",
      color: "error",
      onClick: (params) => {
        router.push(`/activity-types/${params._id}/delete`);
      },
    },
  ]);

  return (
    <DefaultLayout
      pageProps={{
        title: activityType?.name,
        breadcrumbs: [
          { name: "Dashboard", link: "/dashboard" },
          {
            name: "Activity Types",
            link: "/activity-types",
          },
          {
            name: activityType?.name,
            link: "#",
          },
        ],
      }}
    >
      <ContentPanel
        actions={<RecordActions {...activityType} />}
        statusDisplay={{
          show: true,
          status: activityType?.isActive,
          value: activityType?.isActive
            ? "Active Activity Type"
            : "Inactive Activity Type",
        }}
      >
        <BlockDescription
          title="Description"
          description={activityType?.description}
        />
      </ContentPanel>
    </DefaultLayout>
  );
};

export default ViewActivityType;
