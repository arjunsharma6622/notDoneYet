import { User } from "@/lib/models/UserModel";
import { Post } from "@/lib/models/post";
import { connectDB } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request : NextRequest, { params } : { params: { userId: string } }) => {
  const currentUserId = params.userId;

  const page = Number(request.nextUrl.searchParams.get("page") || "1");
  const limit = Number(request.nextUrl.searchParams.get("limit") || "10")

  try {
    await connectDB();

    // Find the user and populate their following list with only the posts field
    const user : any = await User.findById(currentUserId)
      .populate({
        path: "following",
        select: "posts",
      })
      .lean();

    // Get the posts from the users that the current user is following
    const followingUserPosts = user?.following?.flatMap((f : any) => f.posts);

    // Find the recommended posts and populate the user and comments fields
    const recommendedPosts = await Post.find({
      _id: { $in: followingUserPosts },
      createdAt: { $gte: new Date(Date.now() - 100 * 24 * 60 * 60 * 1000) },
    })
      .populate({
        path: "user",
        select: "name image bio",
      })
      .populate({
        path: "comments",
        populate: {
          path: "user",
          select: "name image bio role _id",
        },
      })
      .populate({ path: "likes", select: "name image _id" })
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .lean();

    // Format the recommended posts to include the number of comments and likes
    const formattedRecommendedPosts = recommendedPosts.map((post) => ({
      ...post,
      numComments: post.comments.length,
      numLikes: post.likes.length,
    }));


    return NextResponse.json(formattedRecommendedPosts);
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch recommended posts");
  }
};
