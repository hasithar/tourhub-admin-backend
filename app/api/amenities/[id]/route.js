import { NextResponse } from "next/server";

const apiEndpoint = "amenities";
const labelPlural = "Amenities";
const labelSingular = "Amenity";

// get single
export const GET = async (req, { params }) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/${apiEndpoint}/${params.id}`,
    );
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error(`Error fetching ${labelSingular}:`, error);
    return NextResponse.json(
      { error: `Failed to fetch ${labelSingular}` },
      { status: 500 },
    );
  }
};

// update
export const PATCH = async (req, { params }) => {
  try {
    const updatedAccommodationType = await req.json();
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/${apiEndpoint}/${params.id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedAccommodationType),
      },
    );

    if (!response.ok) {
      const errorData = await response.json();
      let errorMessage = `Failed to updated ${labelSingular}`;

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
        error: `Failed to updated ${labelSingular}`,
        reason: error?.message,
      },
      { status: 500 },
    );
  }
};

// delete
export const DELETE = async (req, { params }) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/${apiEndpoint}/${params.id}`,
      {
        method: "DELETE",
      },
    );

    if (!response.ok) {
      throw new Error(`Failed to delete ${labelSingular}`);
    }

    return NextResponse.json(
      { message: `${labelSingular} deleted` },
      { status: 200 },
    );
  } catch (error) {
    console.error(`Error deleting ${labelSingular}:`, error);
    return NextResponse.json(
      { error: `Failed to delete ${labelSingular}` },
      { status: 500 },
    );
  }
};
