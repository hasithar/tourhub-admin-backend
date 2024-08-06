import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const response = await fetch("http://localhost:8080/accommodation-types/");

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
