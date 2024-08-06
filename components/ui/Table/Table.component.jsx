"use client";

import { DataGrid } from "@mui/x-data-grid";
import { createTheme, ThemeProvider } from "@mui/material";

const theme = createTheme({
  typography: {
    fontFamily: "Satoshi, Arial, sans-serif",
  },
  components: {
    MuiDataGrid: {
      styleOverrides: {
        root: {
          "& .MuiDataGrid-columnHeader": {
            backgroundColor: "#e2e8f0",
          },
          "& .MuiDataGrid-columnTitle": {
            fontWeight: "bold",
          },
        },
      },
    },
  },
});
const Table = (props) => {
  const { title, columns, rows, gridOptions } = props;

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

      <div style={{ width: "100%" }}>
        <ThemeProvider theme={theme}>
          <DataGrid
            rows={rows}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 50 },
              },
            }}
            checkboxSelection={gridOptions?.checkboxSelection || false}
          />
        </ThemeProvider>
      </div>
    </div>
  );
};

export default Table;

// const TableBody = ({ rows, cols, actions, numCols }) => {
//   return (
//     <>
//       {rows.map((row, rowkey) => (
//         <div
//           className={`grid ${numCols} border-t border-stroke px-4 py-4.5 dark:border-strokedark md:px-6 2xl:px-7.5`}
//           key={rowkey}
//         >
//           {cols.map((col, colkey) => (
//             <div
//               className={`col-span-${col?.span ? col?.span : 1} flex items-center`}
//               key={colkey}
//             >
//               <p className="text-black dark:text-white">{row[col?.accessor]}</p>
//             </div>
//           ))}

//           {/* TABLE ACTIONS */}
//           {actions && (
//             <div className={`col-span-1 flex items-center space-x-1`}>
//               {actions.map((action, actionkey) => (
//                 <RowActions row={row} action={action} key={actionkey} />
//               ))}
//             </div>
//           )}
//         </div>
//       ))}
//     </>
//   );
// };

// const RowActions = (props) => {
//   const { row, action, type = action?.name } = props;
//   const btnCls = type === "View" ? "bg-primary" : "bg-secondary";

//   return (
//     <Link
//       href={action?.href}
//       className={`${btnCls} inline-flex items-center justify-center rounded-sm px-2 py-1 text-center text-sm font-medium text-white hover:bg-opacity-90`}
//     >
//       {action?.name}
//     </Link>
//   );
// };
