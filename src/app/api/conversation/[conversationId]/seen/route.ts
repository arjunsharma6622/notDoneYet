import { Conversation } from "@/lib/models/conversation";
import { connectDB } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";


export const PUT = async (request: NextRequest, { params }: { params: { conversationId: string } }) => {
    const { conversationId } = params;

    console.log("conversationId", conversationId)

    try {
        await connectDB()

        const {currUserId} = await request.json()

        const conversation = await Conversation.findById(conversationId);
        if (!conversation) {
            return NextResponse.json({ message: "Conversation not found" });
        }

        for(let i = conversation.messages.length-1; i>=0; i--) {
            if(conversation.messages[i].seen == true) {
                break;
            }

            if(conversation.messages[i].senderId != currUserId) {
            conversation.messages[i].seen = true;
            }
        }

        await conversation.save();
        return NextResponse.json(conversation);
    } catch (error) {
        console.error(error);
        throw new Error("Failed to mark conversation as seen");
    }   
}