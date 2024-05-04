import { User } from "@/lib/models/UserModel";
import { Venue } from "@/lib/models/venue";
import { connectDB } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  try {
    connectDB();

    const {
      name,
      location,
      googleMapsLink,
      images,
      description,
      owner,
      pricing,
      timing,
    }: any = await request.json();

    const newVenue = new Venue({
      name,
      location,
      googleMapsLink,
      images,
      description,
      owner,
      pricing,
      timing,
    });

    await newVenue.save();

    await User.findByIdAndUpdate(owner, { $push: { venues: newVenue._id } });

    return NextResponse.json(newVenue);
  } catch (err) {
    console.log(err);
    throw new Error("Failed Fetching Users!");
    return NextResponse.json({ error: "Failed Fetching Users!" });
  }
};
