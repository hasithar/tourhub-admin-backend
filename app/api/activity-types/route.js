import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const response = await fetch("http://localhost:8080/activity-types/");

    if (!response.ok) {
      throw new Error(
        `Failed to fetch activity types, status: ${response.statusText}`,
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetchin activity types:", error);
    return NextResponse.json(
      { error: "Failed to fetch activity types" },
      { status: 500 },
    );
  }
};
