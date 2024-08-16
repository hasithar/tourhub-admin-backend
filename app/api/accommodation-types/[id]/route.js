import { NextResponse } from "next/server";

// get single
export const GET = async (req, { params }) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/accommodation-types/${params.id}`,
    );
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching accommodation type:", error);
    return NextResponse.json(
      { error: "Failed to fetch accommodation type" },
      { status: 500 },
    );
  }
};

// update
export const PATCH = async (req, { params }) => {
  try {
    const updatedAccommodationType = await req.json();
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/accommodation-types/${params.id}`,
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
      let errorMessage = "Failed to updated accommodation type";

      // custom error messages
      if (errorData?.message && errorData?.message?.includes("E11000")) {
        errorMessage = "Accommodation type already exists";
      }

      throw new Error(errorMessage);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error creating accommodation type:", error);
    return NextResponse.json(
      {
        error: "Failed to updated accommodation type",
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
      `${process.env.NEXT_PUBLIC_API_URL}/accommodation-types/${params.id}`,
      {
        method: "DELETE",
      },
    );

    if (!response.ok) {
      throw new Error("Failed to delete accommodation type");
    }

    return NextResponse.json(
      { message: "Accommodation typr deleted" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error deleting accommodation type:", error);
    return NextResponse.json(
      { error: "Failed to delete accommodation type" },
      { status: 500 },
    );
  }
};
