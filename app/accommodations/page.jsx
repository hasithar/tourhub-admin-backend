"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import DefaultLayout from "@/components/layout/DefaultLayout/DefaultLayout.component";
import Table from "@/components/ui/Table/Table.component";
import withGridActions from "@/hoc/withActions";

const ListAccommodations = () => {
  const [accommodations, setAccommodations] = useState([]);

  // router
  const router = useRouter();

  useEffect(() => {
    const fetchAccommodations = async () => {
      const response = await fetch("/api/accommodations");
      const data = await response.json();
      setAccommodations(data);
    };

    fetchAccommodations();
  }, []);

  const tableData = {
    columns: [
      { field: "name", headerName: "Name", width: 200 },
      { field: "description", headerName: "Description", flex: 1 },
      {
        field: "location",
        headerName: "Location",
        width: 150,
        renderCell: (params) => {
          const location = params?.row?.location?.city;
          return location ? location : "N/A";
        },
      },
      {
        field: "phone",
        headerName: "Phone",
        width: 150,
        renderCell: (params) => {
          const phone = params?.row?.contactDetails?.phone;
          return phone ? phone : "N/A";
        },
      },
      {
        field: "email",
        headerName: "Email",
        flex: 1,
        renderCell: (params) => {
          const email = params?.row?.contactDetails?.email;
          return email ? email : "N/A";
        },
      },
      {
        field: "isActive",
        headerName: "Is Active",
        type: "boolean",
        width: 120,
      },
      {
        field: "action",
        headerName: "Action",
        width: 120,
        renderCell: withGridActions([
          {
            label: "View",
            onClick: (params) => {
              router.push(`/accommodations/${params.row._id}`);
            },
          },
          {
            label: "Edit",
            color: "warning",
            onClick: (parapms) => {
              router.push(`/accommodations/${parapms.row._id}/edit`);
            },
          },
        ]),
      },
    ],
    rows: accommodations,
    gridOptions: {
      pageSizes: [10, 20],
      checkboxSelection: false,
    },
    buttons: withGridActions([
      {
        label: "Create Accommodation",
        size: "medium",
        color: "success",
        onClick: () => {
          router.push("/accommodations/create");
        },
      },
    ]),
  };

  return (
    <DefaultLayout
      pageProps={{
        title: "Accommodations",
        breadcrumbs: [
          { name: "Dashboard", link: "/dashboard" },
          {
            name: "Accommodations",
            link: "/accommodations",
          },
        ],
      }}
    >
      <div className="flex flex-col gap-10">
        <Table
          title="All Accommodations"
          columns={tableData.columns}
          rows={tableData.rows}
          gridOptions={tableData.gridOptions}
          actions={tableData.actions}
          buttons={<tableData.buttons />}
        />
      </div>
    </DefaultLayout>
  );
};

export default ListAccommodations;
