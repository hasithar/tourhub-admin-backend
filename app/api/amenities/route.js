import { NextResponse } from "next/server";

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
