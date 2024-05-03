import { User } from "@/lib/models/UserModel";
import { connectDB } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";


export const GET = async (request : NextRequest, { params } : { params: { userId: string } }) => {
    try{
        connectDB()
        const userID = params.userId
        const userData = await User.findById(userID).populate("following")
        if(!userData){
            throw new Error("User Not Found!")
        }

        return NextResponse.json(userData.following)
    }
    catch(err){
        console.error(err);    }

}