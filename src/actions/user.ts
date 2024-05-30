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

export const toggleProfileLike = async (userId: string, profileId: string) => {
  try {
    await connectDB();

    let messageToSend = "";

    const profile = await User.findById(profileId);
    if (!profile) {
      throw new Error("Profile not found");
    }

    const user = await User.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }

    const isLiked = user.likedProfiles.includes(profileId);
    if (isLiked) {
      profile.profileLikes = profile.profileLikes.filter(
        (_id: string) => _id != userId,
      );
      user.likedProfiles = user.likedProfiles.filter(
        (_id: string) => _id != profileId,
      );

      messageToSend = "Profile unliked";
    } else {
      profile.profileLikes.push(userId);
      user.likedProfiles.push(profileId);

      messageToSend = "Profile liked";
    }

    await profile.save();
    await user.save();

    revalidatePath("/network");
    revalidatePath("/dashboard");
    revalidatePath("/profile/*");

    return messageToSend;
  } catch (err) {
    return err;
  }
};

export const updateUser = async (userData: any) => {
  try {
    await connectDB();

    const updatedUserData = await User.findByIdAndUpdate(
      userData._id,
      userData,
      { new: true },
    );
    if (!updatedUserData) {
      throw new Error("User Not Found!");
    }
    revalidatePath("/dashboard");
  } catch (err) {
    console.error(err);
  }
};

export const updateUserSports = async (userData: any) => {
  try {
    connectDB();
    console.log("the user given data");
    console.log(userData.sports);

    const prevUserData = await User.findById(userData._id);

    console.log("prev user: " + userData.sports);

    prevUserData.sports = userData.sports;

    await prevUserData.save();
    console.log("The User is updated " + prevUserData);
  } catch (err) {
    console.error(err);
  }
};

export const updateAthleteExperience = async (userData: any) => {
  try {
    connectDB();

    const prevUserData = await User.findById(userData._id);
    console.log("prev user: ", prevUserData); // Use prevUserData here instead of userData

    const newUpdatedData = {
      ...prevUserData.toObject(),
      experience: userData.experience,
    };

    // prevUserData.save();
    console.log("The User is updated ");
    console.log(newUpdatedData);

    await User.findByIdAndUpdate(userData._id, newUpdatedData, { new: true });
  } catch (err) {
    console.error("the error is ", err); // Use comma instead of plus for better error logging
  }
};
