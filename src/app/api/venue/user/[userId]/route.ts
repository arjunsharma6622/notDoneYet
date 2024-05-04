import { Venue } from "@/lib/models/venue";
import { connectDB } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  request: NextRequest,
  { params }: { params: { userId: string } },
) => {
  try {
    connectDB();
    const userId = params.userId;
    const venues = await Venue.find({ owner: userId });
    return NextResponse.json(venues);
  } catch (err) {
    console.log(err);
    throw new Error("Failed Fetching Users!");
  }
};
