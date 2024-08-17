"use client";

import DefaultLayout from "@/components/layout/DefaultLayout/DefaultLayout.component";
import ContentPanel from "@/components/ui/ContentPanel/ContentPanel.component";
import AmenityForm from "../components/AmenityForm/AmenityForm";

const CreateAmenity = () => {
  return (
    <DefaultLayout
      pageProps={{
        title: "Create Amenity",
        breadcrumbs: [
          { name: "Dashboard", link: "/dashboard" },
          {
            name: "Amenities",
            link: "/amenities",
          },
          {
            name: "Create Amenity",
            link: "#",
          },
        ],
      }}
    >
      <ContentPanel>
        <div className="mb-4 max-w-lg">
          <AmenityForm />
        </div>
      </ContentPanel>
    </DefaultLayout>
  );
};

export default CreateAmenity;
