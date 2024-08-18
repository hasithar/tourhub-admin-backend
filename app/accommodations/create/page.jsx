"use client";

import { useEffect, useState } from "react";
import DefaultLayout from "@/components/layout/DefaultLayout/DefaultLayout.component";
import ContentPanel from "@/components/ui/ContentPanel/ContentPanel.component";
import AccommodationForm from "../components/AccommodationForm/AccommodationForm";

const CreateAccommodation = () => {
  const [accommodationTypes, setAccommodationTypes] = useState([]);
  const [amenities, setAmenities] = useState([]);

  useEffect(() => {
    const fetchAccommodationTypes = async () => {
      const response = await fetch("/api/accommodation-types");
      const data = await response.json();
      setAccommodationTypes(data);
    };

    const fetchAmenities = async () => {
      const response = await fetch("/api/amenities");
      const data = await response.json();
      setAmenities(data);
    };

    fetchAccommodationTypes();
    fetchAmenities();
  }, []);

  return (
    <DefaultLayout
      pageProps={{
        title: "Create Accommodation",
        breadcrumbs: [
          { name: "Dashboard", link: "/dashboard" },
          {
            name: "Accommodations",
            link: "/accommodations",
          },
          {
            name: "Create Accommodation",
            link: "#",
          },
        ],
      }}
    >
      <ContentPanel>
        <div className="mb-4">
          <AccommodationForm
            refData={{
              accommodationTypes: accommodationTypes,
              amenities: amenities,
            }}
          />
        </div>
      </ContentPanel>
    </DefaultLayout>
  );
};

export default CreateAccommodation;
