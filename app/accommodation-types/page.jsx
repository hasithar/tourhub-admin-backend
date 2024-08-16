"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import DefaultLayout from "@/components/layout/DefaultLayout/DefaultLayout.component";
import Table from "@/components/ui/Table/Table.component";
import withGridActions from "@/hoc/withActions";

const ListAccomodationTypes = () => {
  const [accomodationTypes, setAccomodationTypes] = useState([]);

  // router
  const router = useRouter();

  useEffect(() => {
    const fetchAccomodationTypes = async () => {
      const response = await fetch("/api/accommodation-types");
      const data = await response.json();
      setAccomodationTypes(data);
    };

    fetchAccomodationTypes();
  }, []);

  const tableData = {
    columns: [
      { field: "name", headerName: "Name", width: 200 },
      { field: "description", headerName: "Description", flex: 1 },
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
              router.push(`/accommodation-types/${params.row._id}`);
            },
          },
          {
            label: "Edit",
            color: "warning",
            onClick: (parapms) => {
              router.push(`/accommodation-types/${parapms.row._id}/edit`);
            },
          },
        ]),
      },
    ],
    rows: accomodationTypes,
    gridOptions: {
      pageSizes: [10, 20],
      checkboxSelection: false,
    },
    buttons: withGridActions([
      {
        label: "Create Accommodation Type",
        size: "medium",
        color: "success",
        onClick: () => {
          router.push("/accommodation-types/create");
        },
      },
    ]),
  };

  return (
    <DefaultLayout
      pageProps={{
        title: "Accommodation Types",
        breadcrumbs: [
          { name: "Dashboard", link: "/dashboard" },
          {
            name: "Accommodation Types",
            link: "/accommodation-types",
          },
        ],
      }}
    >
      <div className="flex flex-col gap-10">
        <Table
          title="All Accomodation Types"
          columns={tableData.columns}
          rows={tableData.rows}
          gridOptions={tableData.gridOptions}
          buttons={<tableData.buttons />}
        />
      </div>
    </DefaultLayout>
  );
};

export default ListAccomodationTypes;
