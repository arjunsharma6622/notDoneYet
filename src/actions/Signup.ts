"use server";

import { User } from "@/lib/models/UserModel";
import { connectDB } from "@/lib/utils";
import { hash } from "bcryptjs";

const signup = async (name: string, email: string, password: string) => {
  try {
    // connect DB
    await connectDB();

    const user = await User.findOne({ email });

    if (user) throw new Error("User already exists, please login");

    //create new user
    const hashedPassword = await hash(password, 10);
    await User.create({
      name,
      email,
      password: hashedPassword,
    });

  } catch (error) {
    return (error as Error).message;
  }
};

export { signup };
