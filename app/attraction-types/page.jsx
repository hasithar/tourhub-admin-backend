"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import DefaultLayout from "@/components/layout/DefaultLayout/DefaultLayout.component";
import Table from "@/components/ui/Table/Table.component";
import withGridActions from "@/hoc/withActions";

const ListAttractionTypes = () => {
  const [attractionTypes, setAttractionTypes] = useState([]);

  // router
  const router = useRouter();

  useEffect(() => {
    const fetchAtteactionTypes = async () => {
      const response = await fetch("/api/attraction-types");
      const data = await response.json();
      setAttractionTypes(data);
    };

    fetchAtteactionTypes();
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
              router.push(`/attraction-types/${params.row._id}`);
            },
          },
          {
            label: "Edit",
            color: "warning",
            onClick: (parapms) => {
              router.push(`/attraction-types/${parapms.row._id}/edit`);
            },
          },
        ]),
      },
    ],
    rows: attractionTypes,
    gridOptions: {
      pageSizes: [10, 20],
      checkboxSelection: false,
    },
  };

  return (
    <DefaultLayout
      pageProps={{
        title: "Attraction Types",
        breadcrumbs: [
          { name: "Dashboard", link: "/dashboard" },
          {
            name: "Attraction Types",
            link: "/attraction-types",
          },
        ],
      }}
    >
      <div className="flex flex-col gap-10">
        <Table
          title="All Attraction Types"
          columns={tableData.columns}
          rows={tableData.rows}
          gridOptions={tableData.gridOptions}
          actions={tableData.actions}
        />
      </div>
    </DefaultLayout>
  );
};

export default ListAttractionTypes;
