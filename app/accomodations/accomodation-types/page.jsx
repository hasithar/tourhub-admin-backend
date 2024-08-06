"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import DefaultLayout from "@/components/layout/DefaultLayout/DefaultLayout.component";
import Breadcrumb from "@/components/common/Breadcrumbs/Breadcrumb.component";
import Table from "@/components/ui/Table/Table.component";

const ListAccomodationTypes = () => {
  const [accomodationTypes, setaccomodationTypes] = useState([]);

  useEffect(() => {
    const fetchAccomodationTypes = async () => {
      const response = await fetch("/api/accommodation-types");
      const data = await response.json();
      setaccomodationTypes(data);
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
    ],
    rows: accomodationTypes,
    gridOptions: {
      pageSizes: [10, 20],
      checkboxSelection: false,
    },
    // actions: [
    //   {
    //     name: "View",
    //     href: "/accomodations/accomodation-types/",
    //   },
    //   {
    //     name: "Edit",
    //     href: "/accomodation/accomodation-types/edit/",
    //   },
    // ],
  };

  return (
    <DefaultLayout>
      <Breadcrumb parent={"Accomodations"} pageName="Accomodation Types" />

      <div className="flex flex-col gap-10">
        <Table
          title="All Accomodation Types"
          columns={tableData.columns}
          rows={tableData.rows}
          gridOptions={tableData.gridOptions}
          actions={tableData.actions}
        />
      </div>
    </DefaultLayout>
  );
};

export default ListAccomodationTypes;
