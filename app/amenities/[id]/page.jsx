"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import DefaultLayout from "@/components/layout/DefaultLayout/DefaultLayout.component";
import withRecordActions from "@/hoc/withActions";
import ContentPanel from "@/components/ui/ContentPanel/ContentPanel.component";
import BlockDescription from "@/components/ui/dataDisplay/BlockDescription/BlockDescription.component";

const ViewAmenity = () => {
  const [amenity, setAmenity] = useState([]);

  // router
  const router = useRouter();
  const params = useParams();

  // fetch data
  useEffect(() => {
    const fetchAmenity = async () => {
      const response = await fetch(`/api/amenities/${params.id}`);
      const data = await response.json();
      setAmenity(data);
    };

    fetchAmenity();
  }, [params.id]);

  // record actions
  const RecordActions = withRecordActions([
    {
      label: "Edit",
      onClick: (params) => {
        router.push(`/amenities/${params._id}/edit`);
      },
    },
    {
      label: "Delete",
      color: "error",
      onClick: (params) => {
        router.push(`/amenities/${params._id}/delete`);
      },
    },
  ]);

  return (
    <DefaultLayout
      pageProps={{
        title: amenity?.name,
        breadcrumbs: [
          { name: "Dashboard", link: "/dashboard" },
          {
            name: "Amenities",
            link: "/amenities",
          },
          {
            name: amenity?.name,
            link: "#",
          },
        ],
      }}
    >
      <ContentPanel
        actions={<RecordActions {...amenity} />}
        statusDisplay={{
          show: true,
          status: amenity?.isActive,
          value: amenity?.isActive ? "Active Amenity" : "Inactive Amenity",
        }}
      >
        <BlockDescription
          title="Description"
          description={amenity?.description}
        />
      </ContentPanel>
    </DefaultLayout>
  );
};

export default ViewAmenity;
