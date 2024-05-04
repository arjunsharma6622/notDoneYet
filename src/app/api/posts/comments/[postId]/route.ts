import { Comment } from "@/lib/models/post";
import { connectDB } from "@/lib/utils"
import { NextRequest, NextResponse } from "next/server"


export const GET = async (request : NextRequest, { params } : { params: { postId: string } }) => {
    const postId = params.postId
    try {
        await connectDB();

        const comments = await Comment.find({post: postId})
          .populate({ path: "user", select: "name image bio role" })
          return NextResponse.json(comments);
      } catch (error) {
        console.error(error);
        throw new Error("Failed to fetch post comments");
      }
}




