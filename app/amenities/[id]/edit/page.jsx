"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import DefaultLayout from "@/components/layout/DefaultLayout/DefaultLayout.component";
import ContentPanel from "@/components/ui/ContentPanel/ContentPanel.component";
import AmenityForm from "../../components/AmenityForm/AmenityForm";

const EditAmenity = () => {
  const [amenity, setAmenity] = useState([]);

  // router
  const params = useParams();

  // fetch data
  const fetchAmenity = async () => {
    const response = await fetch(`/api/amenities/${params.id}`);
    const data = await response.json();
    setAmenity(data);
  };

  // fetch data
  useEffect(() => {
    fetchAmenity();
  }, []);

  return (
    <DefaultLayout
      pageProps={{
        title: `Edit ${amenity?.name || ""}`,
        breadcrumbs: [
          { name: "Dashboard", link: "/dashboard" },
          {
            name: "Amenities",
            link: "/amenities",
          },
          {
            name: `${amenity?.name || ""}`,
            link: `/amenities/${amenity?._id}`,
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
          <AmenityForm type="edit" data={amenity} refetchData={fetchAmenity} />
        </div>
      </ContentPanel>
    </DefaultLayout>
  );
};

export default EditAmenity;
