import { Post } from "@/lib/models/post";
import { connectDB } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";


export const GET = async (request : NextRequest, { params }: { params: { postId: string } }) => {

    const postId = params.postId;
    try {
        await connectDB();
        const post = await Post.findById(postId)
        .populate({ path: "user", select: "name image bio followers following role" })
        .populate({
          path: "comments",
          populate: { path: "user", select: "name image" },
        })
        .populate({ path: "likes", select: "name image _id" })
        .sort({ createdAt: -1 })
        
        if (!post) {
            throw new Error("Post Not Found!");
        }
        return NextResponse.json(post);
    } catch (err) {
        console.error(err);
    }
}