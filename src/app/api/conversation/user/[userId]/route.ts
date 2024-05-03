// fetching all the conversations of a user with given userId

import { Conversation } from "@/lib/models/conversation";
import { connectDB } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request : NextRequest, { params } : {params : {userId : string}}) {
    const userId = params.userId
    try {
        connectDB();
        const conversations = await Conversation.find({ users: { $in: [userId] } })
        .populate({
          path: 'users',
          select: 'name image bio',
        })
        .exec();
        return NextResponse.json(conversations)

    } catch (error) {
        console.error(error);
        throw new Error("Failed to fetch conversations");
    }
}