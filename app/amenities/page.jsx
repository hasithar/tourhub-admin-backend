"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import DefaultLayout from "@/components/layout/DefaultLayout/DefaultLayout.component";
import Table from "@/components/ui/Table/Table.component";
import withGridActions from "@/hoc/withGridActions";

const ListAmenities = () => {
  const [amenities, setAmenities] = useState([]);

  // router
  const router = useRouter();

  useEffect(() => {
    const fetchAmenities = async () => {
      const response = await fetch("/api/amenities");
      const data = await response.json();
      setAmenities(data);
    };

    fetchAmenities();
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
              router.push(`/amenities/${params.row._id}`);
            },
          },
          {
            label: "Edit",
            color: "warning",
            onClick: (parapms) => {
              router.push(`/amenities/${parapms.row._id}/edit`);
            },
          },
        ]),
      },
    ],
    rows: amenities,
    gridOptions: {
      pageSizes: [10, 20],
      checkboxSelection: false,
    },
  };

  return (
    <DefaultLayout
      pageProps={{
        title: "Amenities",
        breadcrumbs: [
          { name: "Dashboard", link: "/dashboard" },
          {
            name: "Amenities",
            link: "/amenities",
          },
        ],
      }}
    >
      <div className="flex flex-col gap-10">
        <Table
          title="All Amenities"
          columns={tableData.columns}
          rows={tableData.rows}
          gridOptions={tableData.gridOptions}
          actions={tableData.actions}
        />
      </div>
    </DefaultLayout>
  );
};

export default ListAmenities;
