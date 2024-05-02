"use server";


import { User } from "@/lib/models/UserModel";
import { connectDB } from "@/lib/utils";

export const followUser = async (targetUserId : string, followerUserId : string) => {
  try {
    connectDB();

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

    await followedUser.save();
    await followerUser.save();
  } catch (err) {
    console.error(err);
  }
};

export const unfollowUser = async (targetUserId : string, followerUserId : string) => {
  try {
    connectDB();

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
      (_id : string) => _id != followerUserId
    );
    followerUser.following = followerUser.following.filter(
      (_id : string) => _id != targetUserId
    );

    await followedUser.save();
    await followerUser.save();
  } catch (err) {
    return err;
  }
};
