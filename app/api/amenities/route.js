import { NextResponse } from "next/server";

// get all
export const GET = async () => {
  try {
    const response = await fetch("http://localhost:8080/amenities/");

    if (!response.ok) {
      throw new Error(
        `Failed to fetch Amenities, status: ${response.statusText}`,
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetchin Amenities:", error);
    return NextResponse.json(
      { error: "Failed to fetch Amenities" },
      { status: 500 },
    );
  }
};

// import { NextResponse } from "next/server";

// export const GET = async () => {
//   try {
//     const response = await fetch("http://localhost:3000/accommodations");
//     const data = await response.json();
//     return NextResponse.json(data);
//   } catch (error) {
//     console.error("Error fetching accommodations:", error);
//     return NextResponse.json(
//       { error: "Failed to fetch accommodations" },
//       { status: 500 },
//     );
//   }
// };

// export const POST = async (req) => {
//   try {
//     const newAccommodation = await req.json();
//     const response = await fetch("http://localhost:3000/accommodations", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(newAccommodation),
//     });

//     if (!response.ok) {
//       throw new Error("Failed to add accommodation");
//     }

//     const data = await response.json();
//     return NextResponse.json(data, { status: 201 });
//   } catch (error) {
//     console.error("Error adding accommodation:", error);
//     return NextResponse.json(
//       { error: "Failed to add accommodation" },
//       { status: 500 },
//     );
//   }
// };
