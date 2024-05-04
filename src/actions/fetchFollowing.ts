"use server";

import { User } from "@/lib/models/UserModel";
import { connectDB } from "@/lib/utils";

const fetchFollowing = async (userId: string) => {
  try {
    await connectDB();
    const user = await User.findById(userId).populate(
      "following",
      "-password -__v -followers",
    );
    //make all the _ids to plain string, dont include the password
    const following = user?.following.map((user: any) => {
      const { _id, ...rest } = user._doc;
      return { _id: _id.toString(), ...rest };
    });
    console.log('following', following);
    return following;
  } catch (error) {
    console.error(error); // Log the error for debugging
    throw error; // Rethrow the error to handle it in the client
  }
};

export default fetchFollowing;
