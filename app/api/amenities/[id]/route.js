import { NextResponse } from "next/server";

// get single
export const GET = async (req, { params }) => {
  try {
    const response = await fetch(
      `http://localhost:8080/amenities/${params.id}`,
    );
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching amenity:", error);
    return NextResponse.json(
      { error: "Failed to fetch amenity" },
      { status: 500 },
    );
  }
};

// export const PUT = async (req, { params }) => {
//   try {
//     const updatedAccommodation = await req.json();
//     const response = await fetch(
//       `http://localhost:3000/accommodations/${params.id}`,
//       {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(updatedAccommodation),
//       },
//     );

//     if (!response.ok) {
//       throw new Error("Failed to update accommodation");
//     }

//     const data = await response.json();
//     return NextResponse.json(data);
//   } catch (error) {
//     console.error("Error updating accommodation:", error);
//     return NextResponse.json(
//       { error: "Failed to update accommodation" },
//       { status: 500 },
//     );
//   }
// };

// export const DELETE = async (req, { params }) => {
//   try {
//     const response = await fetch(
//       `http://localhost:3000/accommodations/${params.id}`,
//       {
//         method: "DELETE",
//       },
//     );

//     if (!response.ok) {
//       throw new Error("Failed to delete accommodation");
//     }

//     return NextResponse.json(
//       { message: "Accommodation deleted" },
//       { status: 200 },
//     );
//   } catch (error) {
//     console.error("Error deleting accommodation:", error);
//     return NextResponse.json(
//       { error: "Failed to delete accommodation" },
//       { status: 500 },
//     );
//   }
// };
