"use server";

import { User } from "@/lib/models/UserModel";
import { connectDB } from "@/lib/utils";
import { revalidatePath } from "next/cache";

export const followUser = async (
  targetUserId: string,
  followerUserId: string,
) => {
  try {
    await connectDB();

    console.log("target user id: " + targetUserId);
    console.log("follower user id: " + followerUserId);

    const followedUser = await User.findById(targetUserId);
    if (!followedUser) {
      throw new Error("Followed user not found");
    }

    const followerUser = await User.findById(followerUserId);
    if (!followerUser) {
      throw new Error("Follower user not found");
    }

    // Check if follower is already following the user
    if (followedUser.followers.includes(followerUserId)) {
      console.log("Follower is already following the user");
      return; // Exit the function to prevent adding duplicate follow relationship
    }

    followedUser.followers.push(followerUserId);
    followerUser.following.push(targetUserId);

    await followedUser.save();
    await followerUser.save();

    revalidatePath("/network");
    revalidatePath("/dashboard");
  } catch (err) {
    console.error(err);
  }
};

export const unfollowUser = async (
  targetUserId: string,
  followerUserId: string,
) => {
  try {
    await connectDB();

    const followedUser = await User.findById(targetUserId);

    if (!followedUser) {
      throw new Error("Followed user not found");
    }

    const followerUser = await User.findById(followerUserId);
    if (!followerUser) {
      throw new Error("Follower user not found");
    }

    // Check if follower is already following the user
    if (!followedUser.followers.includes(followerUserId)) {
      console.log("Follower is not following the user");
      return; // Exit the function to prevent adding duplicate follow relationship
    }

    followedUser.followers = followedUser.followers.filter(
      (_id: string) => _id != followerUserId,
    );
    followerUser.following = followerUser.following.filter(
      (_id: string) => _id != targetUserId,
    );

    await followedUser.save();
    await followerUser.save();

    revalidatePath("/network");
  } catch (err) {
    return err;
  }
};
