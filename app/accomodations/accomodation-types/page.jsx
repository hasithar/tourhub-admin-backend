import Link from "next/link";
import DefaultLayout from "@/components/layout/DefaultLayout/DefaultLayout.component";
import Breadcrumb from "@/components/common/Breadcrumbs/Breadcrumb.component";
import Table from "@/components/ui/Table/Table.component";

const ListAccomodationTypes = () => {
  const tableData = {
    cols: [
      {
        header: "Product Name",
        accessor: "name",
        span: 3,
      },
      {
        header: "Category",
        accessor: "category",
        span: 2,
      },
      {
        header: "Profit",
        accessor: "profit",
      },
      {
        header: "Price",
        accessor: "price",
      },
      {
        header: "Sold",
        accessor: "sold",
      },
    ],
    rows: [
      {
        image: "/images/product/product-01.png",
        name: "Apple Watch Series 7",
        category: "Electronics",
        price: 296,
        sold: 22,
        profit: 45,
      },
      {
        image: "/images/product/product-02.png",
        name: "Macbook Pro M1",
        category: "Electronics",
        price: 546,
        sold: 12,
        profit: 125,
      },
      {
        image: "/images/product/product-03.png",
        name: "Dell Inspiron 15",
        category: "Electronics",
        price: 443,
        sold: 64,
        profit: 247,
      },
      {
        image: "/images/product/product-04.png",
        name: "HP Probook 450",
        category: "Electronics",
        price: 499,
        sold: 72,
        profit: 103,
      },
    ],
  };

  return (
    <DefaultLayout>
      <Breadcrumb parent={"Accomodations"} pageName="Accomodation Types" />

      <div className="flex flex-col gap-10">
        <Table
          title="All Accomodation Types"
          cols={tableData.cols}
          rows={tableData.rows}
        />
      </div>

      {/* List Accomodation Types */}
      {/* <Link href="/accomodation-types/add">Add Accomodation</Link> */}
      <ul>
        <li>
          Accomodation Type 1<Link href="/accomodation-types/edit/1">Edit</Link>
        </li>
      </ul>
    </DefaultLayout>
  );
};

export default ListAccomodationTypes;
