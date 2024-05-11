import { User } from "@/lib/models/UserModel";
import { connectDB } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";

// update user route
export const PATCH = async (
  request: NextRequest,
  { params }: { params: { userId: string } },
) => {
  try {
    await connectDB();
    const data = await request.json();

    const userId = params.userId;
    const updatedData = await User.findByIdAndUpdate(userId, data, {
      new: true,
    }); // Ensure { new: true } to return the updated document

    if (!updatedData) {
      throw new Error("User not found");
    }
    return NextResponse.json(updatedData);
  } catch (err) {
    console.error(err);
    throw new Error("Error updating user");
  }
};

export const GET = async (
  request: NextRequest,
  { params }: { params: { userId: string } },
) => {
  try {
    await connectDB();
    const userID = params.userId;
    const userData = await User.findById(userID)
    // .populate("posts");
    if (!userData) {
      throw new Error("User Not Found!");
    }
    return NextResponse.json(userData);
  } catch (err) {
    console.error(err);
  }
};
