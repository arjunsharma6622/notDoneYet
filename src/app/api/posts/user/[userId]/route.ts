import { Post } from "@/lib/models/post";
import { connectDB } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  request: NextRequest,
  { params }: { params: { userId: string } },
) => {
  const userId = params.userId;

  try {
    await connectDB();

    const posts = await Post.find({ user: userId })
      .populate({ path: "user", select: "name image bio role" })
      .populate({
        path: "comments",
        populate: { path: "user", select: "name image" },
      })
      .populate({ path: "likes", select: "name image" })
      .sort({ createdAt: -1 })
      .lean();
    return NextResponse.json(posts);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch posts" });
  }
};
