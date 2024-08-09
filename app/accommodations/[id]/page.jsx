"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import DefaultLayout from "@/components/layout/DefaultLayout/DefaultLayout.component";
import withRecordActions from "@/hoc/withActions";
import ContentPanel from "@/components/ui/ContentPanel/ContentPanel.component";
import BlockDescription from "@/components/ui/dataDisplay/BlockDescription/BlockDescription.component";
import BlockContacts from "@/components/ui/dataDisplay/BlockContacts/BlockContacts.component";

const ViewAccommodation = () => {
  const [accommodation, setAccommodation] = useState([]);
  const [accommodationType, setAccommodationType] = useState({});

  // router
  const router = useRouter();
  const params = useParams();

  // fetch data
  useEffect(() => {
    const fetchAccommodation = async () => {
      const response = await fetch(`/api/accommodations/${params.id}`);
      const data = await response.json();
      setAccommodation(data);
    };

    fetchAccommodation();
  }, [params.id]);

  // fetch data
  useEffect(() => {
    const fetchAccommodationType = async () => {
      const response = await fetch(
        `/api/accommodation-types/${accommodation.type}`,
      );
      const data = await response.json();
      setAccommodationType(data);
    };

    accommodation?.type && fetchAccommodationType();
  }, [accommodation?.type]);

  // record actions
  const RecordActions = withRecordActions([
    {
      label: "Edit",
      onClick: (params) => {
        router.push(`/accommodations/${params._id}/edit`);
      },
    },
    {
      label: "Delete",
      color: "error",
      onClick: (params) => {
        router.push(`/accommodations/${params._id}/delete`);
      },
    },
  ]);

  // {

  //     "contactDetails": {
  //         "phone": "+94 112 558 700",
  //         "email": "info@jetwinghotels.com",
  //         "website": "https://www.jetwinghotels.com/jetwingcolomboseven/"
  //     },
  //     "rating": {
  //         "customerRating": 9,
  //         "starRating": 5
  //     },
  //     "location": {
  //         "coordinates": {
  //             "type": "Point",
  //             "coordinates": [
  //                 79.857603,
  //                 6.917464
  //             ]
  //         },
  //         "address": "57 Ward Pl",
  //         "city": "Colombo",
  //         "province": "Western",
  //         "postalCode": "00700",
  //         "country": "Sri Lanka"
  //     },
  //     "contacts": [
  //         {
  //             "name": "Jane Doe",
  //             "email": "jane.doe@jetwinghotels.com",
  //             "phone": "+94 112 558 700 ext 101",
  //             "role": "Reservation Agent"
  //         },
  //         {
  //             "name": "John Smith",
  //             "email": "john.smith@jetwinghotels.com",
  //             "phone": "+94 112 558 700 ext 102",
  //             "role": "Manager"
  //         },
  //         {
  //             "name": "Alice Brown",
  //             "email": "alice.brown@jetwinghotels.com",
  //             "phone": "+94 112 558 700 ext 103",
  //             "role": "Sales Agent"
  //         }
  //     ],
  //     "amenities": [
  //         "66a8e0f1649b9dfbb934b5cb",
  //         "66a8e0f1649b9dfbb934b5cc",
  //         "66a8e0f1649b9dfbb934b5cd",
  //         "66a8e0f1649b9dfbb934b5ce",
  //         "66a8e0f1649b9dfbb934b5d4",
  //         "66a8e0f1649b9dfbb934b5d0",
  //         "66a8e0f1649b9dfbb934b5d2"
  //     ],
  //     "numberOfReviews": 0,

  // }

  return (
    <DefaultLayout
      pageProps={{
        title: accommodation?.name,
        breadcrumbs: [
          { name: "Dashboard", link: "/dashboard" },
          {
            name: "Accommodations",
            link: "/accommodations",
          },
          {
            name: accommodation?.name,
            link: "#",
          },
        ],
      }}
    >
      <ContentPanel
        actions={<RecordActions {...accommodation} />}
        statusDisplay={{
          show: true,
          status: accommodation?.isActive,
          value: accommodation?.isActive
            ? "Active Accommodation"
            : "Inactive Accommodation",
        }}
      >
        <div className="flex flex-row gap-4">
          <div className="content-wrap w-2/3">
            {accommodationType?.name && (
              <BlockDescription
                title="Accommodation Type"
                description={accommodationType?.name}
              />
            )}
            <BlockDescription
              title="Description"
              description={accommodation?.description}
            />
          </div>

          <div className="content-wrap w-1/3">
            {accommodation?.contacts && (
              <BlockContacts
                title="Contact Persons"
                contacts={accommodation?.contacts}
              />
            )}
          </div>
        </div>
      </ContentPanel>
    </DefaultLayout>
  );
};

export default ViewAccommodation;
