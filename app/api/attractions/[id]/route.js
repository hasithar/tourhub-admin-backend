import { NextResponse } from "next/server";

// get single
export const GET = async (req, { params }) => {
  try {
    const response = await fetch(
      `http://localhost:8080/attractions/${params.id}`,
    );
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching attraction:", error);
    return NextResponse.json(
      { error: "Failed to fetch attraction" },
      { status: 500 },
    );
  }
};
