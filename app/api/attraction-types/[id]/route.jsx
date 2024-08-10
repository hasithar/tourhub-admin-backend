import { NextResponse } from "next/server";

// get single
export const GET = async (req, { params }) => {
  try {
    const response = await fetch(
      `http://localhost:8080/attraction-types/${params.id}`,
    );
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching attraction type:", error);
    return NextResponse.json(
      { error: "Failed to fetch attraction type" },
      { status: 500 },
    );
  }
};

// export const PUT = async (req, { params }) => {
//   try {
//     const updatedAccommodation = await req.json();
//     const response = await fetch(
//       `http://localhost:3000/attractions/${params.id}`,
//       {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(updatedAccommodation),
//       },
//     );

//     if (!response.ok) {
//       throw new Error("Failed to update attraction");
//     }

//     const data = await response.json();
//     return NextResponse.json(data);
//   } catch (error) {
//     console.error("Error updating attraction:", error);
//     return NextResponse.json(
//       { error: "Failed to update attraction" },
//       { status: 500 },
//     );
//   }
// };

// export const DELETE = async (req, { params }) => {
//   try {
//     const response = await fetch(
//       `http://localhost:3000/attractions/${params.id}`,
//       {
//         method: "DELETE",
//       },
//     );

//     if (!response.ok) {
//       throw new Error("Failed to delete attraction");
//     }

//     return NextResponse.json(
//       { message: "Accommodation deleted" },
//       { status: 200 },
//     );
//   } catch (error) {
//     console.error("Error deleting attraction:", error);
//     return NextResponse.json(
//       { error: "Failed to delete attraction" },
//       { status: 500 },
//     );
//   }
// };
