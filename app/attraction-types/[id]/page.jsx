"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import DefaultLayout from "@/components/layout/DefaultLayout/DefaultLayout.component";
import withRecordActions from "@/hoc/withActions";
import ContentPanel from "@/components/ui/ContentPanel/ContentPanel.component";
import BlockDescription from "@/components/ui/dataDisplay/BlockDescription/BlockDescription.component";

const ViewAttractionType = () => {
  const [attractionType, setAttractionType] = useState([]);

  // router
  const router = useRouter();
  const params = useParams();

  // fetch data
  useEffect(() => {
    const fetchAttractionType = async () => {
      const response = await fetch(`/api/attraction-types/${params.id}`);
      const data = await response.json();
      setAttractionType(data);
    };

    fetchAttractionType();
  }, [params.id]);

  // record actions
  const RecordActions = withRecordActions([
    {
      label: "Edit",
      onClick: (params) => {
        router.push(`/attraction-types/${params._id}/edit`);
      },
    },
    {
      label: "Delete",
      color: "error",
      onClick: (params) => {
        router.push(`/attraction-types/${params._id}/delete`);
      },
    },
  ]);

  return (
    <DefaultLayout
      pageProps={{
        title: attractionType?.name,
        breadcrumbs: [
          { name: "Dashboard", link: "/dashboard" },
          {
            name: "Attraction Types",
            link: "/attraction-types",
          },
          {
            name: attractionType?.name,
            link: "#",
          },
        ],
      }}
    >
      <ContentPanel
        actions={<RecordActions {...attractionType} />}
        statusDisplay={{
          show: true,
          status: attractionType?.isActive,
          value: attractionType?.isActive
            ? "Active Attraction Type"
            : "Inactive Attraction Type",
        }}
      >
        <BlockDescription
          title="Description"
          description={attractionType?.description}
        />
      </ContentPanel>
    </DefaultLayout>
  );
};

export default ViewAttractionType;
