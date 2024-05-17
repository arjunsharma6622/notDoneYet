"use server";

import { User } from "@/lib/models/UserModel";
import { Comment, Post } from "@/lib/models/post";
import { connectDB } from "@/lib/utils";
import { revalidatePath } from "next/cache";

export const createPost = async (postData: any) => {
  try {
    await connectDB();

    const user = await User.findById(postData.user);

    const newPost = new Post(postData);

    await newPost.save();

    user.posts.push(newPost);

    await user.save();
  } catch (error) {
    console.log("Ther is some error in post uploading in server");
    console.log(error);
  }
};
export const toggleLike = async (postId: string, userId: string) => {
  try {
    await connectDB();
    let message = "";

    const post = await Post.findById(postId);

    if (!post) {
      throw new Error("Post not found");
    }

    const user = await User.findById(userId);

    if (!user) {
      throw new Error("User not found");
    }

    if (post.likes.includes(userId)) {
      post.likes = post.likes.filter((like: any) => like != userId);
      message = "Post unliked";
    } else {
      post.likes.push(userId);
      message = "Post liked";
    }

    await post.save();
    revalidatePath(`/`);
    return { message };
  } catch (error) {
    console.log(error);
  }
};
export const addComment = async (
  userId: string,
  postId: string,
  parentCommentId: string | null,
  commentText: string,
) => {
  try {
    await connectDB();
    // Find the user, post, and parent comment by their IDs
    const user = await User.findById(userId);
    const post = await Post.findById(postId);
    const parentComment = parentCommentId
      ? await Comment.findById(parentCommentId)
      : null;

    if (!user || !post) {
      throw new Error("User or post not found");
    }

    // Check if the parent comment has a parent comment
    if (parentComment && parentComment.parentComment) {
      throw new Error("Nesting beyond one level is not allowed");
    }

    // Create a new comment
    const newComment = await Comment.create({
      user: user._id,
      post: post._id,
      parentComment: parentComment ? parentComment._id : null,
      text: commentText,
    });

    // Add the new comment to the post's comments array
    post.comments.push(newComment._id);
    await post.save();

    // If the new comment is a reply, add it to the parent comment's replies array
    if (parentComment) {
      parentComment.replies.push(newComment._id);
      await parentComment.save();
    }
    revalidatePath(`/`);
    return { message : "Comment added successfully" };
  } catch (error) {
    console.error(error);
    throw error;
  }
};