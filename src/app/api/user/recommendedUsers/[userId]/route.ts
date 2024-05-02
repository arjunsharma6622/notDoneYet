import { connectDB } from "@/lib/utils";
import { User } from "@/lib/models/UserModel";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest, { params }: { params: { userId: string } }) => {
    const userId = params.userId;
    try {
        await connectDB();

        // Retrieve the current user to get their following list
        const currentUser = await User.findById(userId);

        if (!currentUser) {
            throw new Error("Current user not found");
        }

        // Find all users except the current user
        const users = await User.find({ _id: { $ne: userId } });

        // Map over each user to add the followingUser field
        const recUsers = users.map((user) => {
            return {
                ...user._doc, // Retrieve the document data
                followingUser: currentUser.following.includes(user._id), // Check if the current user is following this user
            };
        });

        return NextResponse.json(recUsers);
    } catch (err) {
        console.error(err);
    }
}