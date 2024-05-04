"use server";

import { User } from "@/lib/models/UserModel";
import { connectDB } from "@/lib/utils";
import { revalidatePath } from "next/cache";

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
