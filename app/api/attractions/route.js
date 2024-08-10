import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const response = await fetch("http://localhost:8080/attractions/");

    if (!response.ok) {
      throw new Error(
        `Failed to fetch attractions, status: ${response.statusText}`,
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching attractions:", error);
    return NextResponse.json(
      { error: "Failed to fetch attractions" },
      { status: 500 },
    );
  }
};
