import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const response = await fetch("http://localhost:8080/accommodations/");

    if (!response.ok) {
      throw new Error(
        `Failed to fetch Accommodations, status: ${response.statusText}`,
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching Accommodations:", error);
    return NextResponse.json(
      { error: "Failed to fetch Accommodations" },
      { status: 500 },
    );
  }
};
