import Link from "next/link";
import DefaultLayout from "@/components/layout/DefaultLayout/DefaultLayout.component";
import Breadcrumb from "@/components/common/Breadcrumbs/Breadcrumb.component";
import Table from "@/components/ui/Table/Table.component";
import { Typography } from "@mui/material";

const ListAccomodationTypes = () => {
  const tableData = {
    columns: [
      { field: "id", headerName: "ID", width: 70 },
      { field: "firstName", headerName: "First name", flex: 1 },
      { field: "lastName", headerName: "Last name", flex: 1 },
      {
        field: "age",
        headerName: "Age",
        type: "number",
        width: 90,
      },
    ],
    rows: [
      { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
      { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
      { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
      { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
      { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
      { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
      { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
      { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
      { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
    ],
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
