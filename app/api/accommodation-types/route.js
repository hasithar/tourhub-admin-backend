import { NextResponse } from "next/server";

// get all
export const GET = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/accommodation-types/`,
    );

    if (!response.ok) {
      throw new Error(
        `Failed to fetch Accommodation Types, status: ${response.statusText}`,
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetchin accommodation types:", error);
    return NextResponse.json(
      { error: "Failed to fetch Accommodation Types" },
      { status: 500 },
    );
  }
};

// create
export const POST = async (req) => {
  try {
    const newAccommodationType = await req.json();
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/accommodation-types/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newAccommodationType),
      },
    );

    if (!response.ok) {
      const errorData = await response.json();
      let errorMessage = "Failed to create accommodation type";

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
        error: "Failed to create accommodation type",
        reason: error?.message,
      },
      { status: 500 },
    );
  }
};
