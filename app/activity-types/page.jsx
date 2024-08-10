"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import DefaultLayout from "@/components/layout/DefaultLayout/DefaultLayout.component";
import Table from "@/components/ui/Table/Table.component";
import withGridActions from "@/hoc/withActions";

const ListActivityTypes = () => {
  const [activityTypes, setActivityTypes] = useState([]);

  // router
  const router = useRouter();

  useEffect(() => {
    const fetchActivityTypes = async () => {
      const response = await fetch("/api/activity-types");
      const data = await response.json();
      setActivityTypes(data);
    };

    fetchActivityTypes();
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
              router.push(`/activity-types/${params.row._id}`);
            },
          },
          {
            label: "Edit",
            color: "warning",
            onClick: (parapms) => {
              router.push(`/activity-types/${parapms.row._id}/edit`);
            },
          },
        ]),
      },
    ],
    rows: activityTypes,
    gridOptions: {
      pageSizes: [10, 20],
      checkboxSelection: false,
    },
  };

  return (
    <DefaultLayout
      pageProps={{
        title: "Activity Types",
        breadcrumbs: [
          { name: "Dashboard", link: "/dashboard" },
          {
            name: "Activity Types",
            link: "/activity-types",
          },
        ],
      }}
    >
      <div className="flex flex-col gap-10">
        <Table
          title="All Activity Types"
          columns={tableData.columns}
          rows={tableData.rows}
          gridOptions={tableData.gridOptions}
          actions={tableData.actions}
        />
      </div>
    </DefaultLayout>
  );
};

export default ListActivityTypes;
