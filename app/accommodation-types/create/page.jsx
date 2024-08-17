"use client";

import DefaultLayout from "@/components/layout/DefaultLayout/DefaultLayout.component";
import ContentPanel from "@/components/ui/ContentPanel/ContentPanel.component";
import AccommodationTypeForm from "../components/AccommodationTypeForm/AccommodationTypeForm";

const CreateAccommodationType = () => {
  return (
    <DefaultLayout
      pageProps={{
        title: "Create Accommodation Type",
        breadcrumbs: [
          { name: "Dashboard", link: "/dashboard" },
          {
            name: "Accommodation Types",
            link: "/accommodation-types",
          },
          {
            name: "Create Accommodation Type",
            link: "#",
          },
        ],
      }}
    >
      <ContentPanel>
        <div className="mb-4 max-w-lg">
          <AccommodationTypeForm />
        </div>
      </ContentPanel>
    </DefaultLayout>
  );
};

export default CreateAccommodationType;
