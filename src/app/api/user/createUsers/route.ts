import { User } from "@/lib/models/UserModel";
import { connectDB } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";


export const POST = async (request: NextRequest) => {
    try {
        await connectDB();
        const {name, email, role, profileImg, phone, bio, about, sports} = await request.json();
        const user = new User({
            name,
            email,
            role,
            image : profileImg,
            bio,
            about,
            phone,
            sports
        });
        await user.save();
        return NextResponse.json(user);
    } catch (err) {
        console.log(err);
    }
}