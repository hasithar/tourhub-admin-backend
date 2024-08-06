// theme.js
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: "Satoshi, Arial, sans-serif",
  },
  // components: {
  //   // MuiTypography: {
  //   //   defaultProps: {
  //   //     fontFamily: "Satoshi, Arial, sans-serif",
  //   //   },
  //   // },
  //   // MuiButton: {
  //   //   defaultProps: {
  //   //     style: {
  //   //       fontFamily: "Satoshi, Arial, sans-serif",
  //   //     },
  //   //   },
  //   // },
  //   // MuiDataGrid: {
  //   //   styleOverrides: {
  //   //     root: {
  //   //       fontFamily: "Satoshi, Arial, sans-serif",
  //   //     },
  //   //     columnHeader: {
  //   //       fontFamily: "Satoshi, Arial, sans-serif",
  //   //     },
  //   //     cell: {
  //   //       fontFamily: "Satoshi, Arial, sans-serif",
  //   //     },
  //   //   },
  //   // },
  // },
});

export default theme;

// "use client";
// import { Roboto } from "next/font/google";

// const roboto = Roboto({
//   weight: ["300", "400", "500", "700"],
//   subsets: ["latin"],
//   display: "swap",
// });

// const theme = createTheme({
//   palette: {
//     mode: "light",
//   },
//   typography: {
//     fontFamily: roboto.style.fontFamily,
//   },
//   components: {
//     MuiAlert: {
//       styleOverrides: {
//         root: ({ ownerState }) => ({
//           ...(ownerState.severity === "info" && {
//             backgroundColor: "#60a5fa",
//           }),
//         }),
//       },
//     },
//   },
// });

// export default theme;
