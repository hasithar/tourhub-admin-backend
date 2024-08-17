import { NextResponse } from "next/server";

const apiEndpoint = "amenities";
const labelPlural = "Amenities";
const labelSingular = "Amenity";

// get all
export const GET = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/${apiEndpoint}/`,
    );

    if (!response.ok) {
      throw new Error(
        `Failed to fetch ${labelPlural}, status: ${response.statusText}`,
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error(`Error fetching ${labelPlural}:`, error);
    return NextResponse.json(
      { error: `Failed to fetch ${labelPlural}` },
      { status: 500 },
    );
  }
};

// create
export const POST = async (req) => {
  try {
    const newRecord = await req.json();
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/${apiEndpoint}/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newRecord),
      },
    );

    if (!response.ok) {
      const errorData = await response.json();
      let errorMessage = `Failed to create ${labelSingular}`;

      // custom error messages
      if (errorData?.message && errorData?.message?.includes("E11000")) {
        errorMessage = `${labelSingular} already exists`;
      }

      throw new Error(errorMessage);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error(`Error creating ${labelSingular}:`, error);
    return NextResponse.json(
      {
        error: `Failed to create ${labelSingular}`,
        reason: error?.message,
      },
      { status: 500 },
    );
  }
};
