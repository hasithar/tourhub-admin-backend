"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import DefaultLayout from "@/components/layout/DefaultLayout/DefaultLayout.component";
import withRecordActions from "@/hoc/withActions";
import ContentPanel from "@/components/ui/ContentPanel/ContentPanel.component";
import BlockDescription from "@/components/ui/dataDisplay/BlockDescription/BlockDescription.component";

const ViewAccommodationType = () => {
  const [accommodationType, setAccommodationType] = useState([]);

  // router
  const router = useRouter();
  const params = useParams();

  // fetch data
  useEffect(() => {
    const fetchAccommodationType = async () => {
      const response = await fetch(`/api/accommodation-types/${params.id}`);
      const data = await response.json();
      setAccommodationType(data);
    };

    fetchAccommodationType();
  }, [params.id]);

  // record actions
  const RecordActions = withRecordActions([
    {
      label: "Edit",
      onClick: (params) => {
        router.push(`/accommodation-types/${params._id}/edit`);
      },
    },
    {
      label: "Delete",
      color: "error",
      onClick: (params) => {
        router.push(`/accommodation-types/${params._id}/delete`);
      },
    },
  ]);

  return (
    <DefaultLayout
      pageProps={{
        title: accommodationType?.name,
        breadcrumbs: [
          { name: "Dashboard", link: "/dashboard" },
          {
            name: "Accommodation Types",
            link: "/accommodation-types",
          },
          {
            name: accommodationType?.name,
            link: "#",
          },
        ],
      }}
    >
      <ContentPanel
        actions={<RecordActions {...accommodationType} />}
        statusDisplay={{
          show: true,
          status: accommodationType?.isActive,
          value: accommodationType?.isActive
            ? "Active Amenity"
            : "Inactive Amanity",
        }}
      >
        <BlockDescription
          title="Description"
          description={accommodationType?.description}
        />
      </ContentPanel>
    </DefaultLayout>
  );
};

export default ViewAccommodationType;
