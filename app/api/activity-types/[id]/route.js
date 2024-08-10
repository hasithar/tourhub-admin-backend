import { NextResponse } from "next/server";

// get single
export const GET = async (req, { params }) => {
  try {
    const response = await fetch(
      `http://localhost:8080/activity-types/${params.id}`,
    );
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching activity type:", error);
    return NextResponse.json(
      { error: "Failed to fetch activity type" },
      { status: 500 },
    );
  }
};

// export const PUT = async (req, { params }) => {
//   try {
//     const updatedAccommodation = await req.json();
//     const response = await fetch(
//       `http://localhost:3000/activitys/${params.id}`,
//       {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(updatedAccommodation),
//       },
//     );

//     if (!response.ok) {
//       throw new Error("Failed to update activity");
//     }

//     const data = await response.json();
//     return NextResponse.json(data);
//   } catch (error) {
//     console.error("Error updating activity:", error);
//     return NextResponse.json(
//       { error: "Failed to update activity" },
//       { status: 500 },
//     );
//   }
// };

// export const DELETE = async (req, { params }) => {
//   try {
//     const response = await fetch(
//       `http://localhost:3000/activitys/${params.id}`,
//       {
//         method: "DELETE",
//       },
//     );

//     if (!response.ok) {
//       throw new Error("Failed to delete activity");
//     }

//     return NextResponse.json(
//       { message: "Accommodation deleted" },
//       { status: 200 },
//     );
//   } catch (error) {
//     console.error("Error deleting activity:", error);
//     return NextResponse.json(
//       { error: "Failed to delete activity" },
//       { status: 500 },
//     );
//   }
// };
