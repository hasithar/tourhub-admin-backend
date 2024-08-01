import Link from "next/link";
import DefaultLayout from "@/components/layout/DefaultLayout/DefaultLayout.component";

const ListAccomodationTypes = () => {
  return (
    <DefaultLayout>
      List Accomodation Types
      <Link href="/accomodation-types/add">Add Accomodation</Link>
      <ul>
        <li>
          Accomodation Type 1<Link href="/accomodation-types/edit/1">Edit</Link>
        </li>
        <li>
          Accomodation Type 2<Link href="/accomodation-types/edit/2">Edit</Link>
        </li>
        <li>
          Accomodation Type 3<Link href="/accomodation-types/edit/3">Edit</Link>
        </li>
      </ul>
    </DefaultLayout>
  );
};

export default ListAccomodationTypes;
