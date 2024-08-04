import Image from "next/image";

const productData = [
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
];

const Table = (props) => {
  const { title, cols, rows } = props;

  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      {/* <!-- TABLE TITLE --> */}
      {title && (
        <div className="px-4 py-6 md:px-6 xl:px-7.5">
          <h4 className="text-xl font-semibold text-black dark:text-white">
            {title}
          </h4>
        </div>
      )}

      {/* <!-- TABLE HEADER --> */}
      {cols.length > 0 && (
        <div className="grid grid-cols-6 border-t border-stroke bg-slate-100 px-4 py-4.5 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5">
          {cols.map((col, key) => (
            <div
              className={`col-span-${col?.span ? col?.span : 1} flex items-center`}
              key={key}
            >
              <p className="font-bold">{col?.header}</p>
            </div>
          ))}
        </div>
      )}

      {/* <!-- TABLE BODY --> */}
      {rows.map((row, rowkey) => (
        <div
          className="grid grid-cols-6 border-t border-stroke px-4 py-4.5 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5"
          key={rowkey}
        >
          {cols.map((col, colkey) => (
            <div
              className={`col-span-${col?.span ? col?.span : 1} flex items-center`}
              key={colkey}
            >
              <p className="text-black dark:text-white">{row[col?.accessor]}</p>
            </div>
          ))}

          {/* <div className="col-span-1 flex items-center">
            <p className="text-sm text-black dark:text-white">${row.profit}</p>
          </div> */}
        </div>
      ))}
    </div>
  );
};

export default Table;
