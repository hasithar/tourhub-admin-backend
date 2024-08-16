"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import DefaultLayout from "@/components/layout/DefaultLayout/DefaultLayout.component";
import ContentPanel from "@/components/ui/ContentPanel/ContentPanel.component";
import AccommodationTypeForm from "../../components/AccommodationTypeForm/AccommodationTypeForm";

const EditAccommodationType = () => {
  const [accommodationType, setAccommodationType] = useState([]);

  // router
  const params = useParams();

  // fetch data
  const fetchAccommodationType = async () => {
    const response = await fetch(`/api/accommodation-types/${params.id}`);
    const data = await response.json();
    setAccommodationType(data);
  };

  // fetch data
  useEffect(() => {
    fetchAccommodationType();
  }, []);

  return (
    <DefaultLayout
      pageProps={{
        title: `Edit ${accommodationType?.name || ""}`,
        breadcrumbs: [
          { name: "Dashboard", link: "/dashboard" },
          {
            name: "Accommodation Types",
            link: "/accommodation-types",
          },
          {
            name: `${accommodationType?.name || ""}`,
            link: `/accommodation-types/${accommodationType?._id}`,
          },
          {
            name: "Edit",
            link: "#",
          },
        ],
      }}
    >
      <ContentPanel>
        <div className="mb-4 max-w-lg">
          <AccommodationTypeForm
            type="edit"
            data={accommodationType}
            refetchData={fetchAccommodationType}
          />
        </div>
      </ContentPanel>
    </DefaultLayout>
  );
};

export default EditAccommodationType;
