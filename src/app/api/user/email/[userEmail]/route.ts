import { User } from "@/lib/models/UserModel";
import { connectDB } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  request: NextRequest,
  { params }: { params: { userEmail: string } },
) => {
  try {
    await connectDB();
    const userEmail = params.userEmail;
    const userData = await User.findOne({ email: userEmail });
    if (!userData) {
      throw new Error("User Not Found!");
    }

    return NextResponse.json(userData);
  } catch (err) {
    console.error(err);
  }
};
