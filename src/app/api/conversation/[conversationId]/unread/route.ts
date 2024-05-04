import { Conversation } from "@/lib/models/conversation";
import { connectDB } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";



// fetching all the yet to read messages, the not read ones
export const GET = async (request : NextRequest, { params }: { params: { conversationId: string } }) => {

    const { conversationId } = params;
    try {
        await connectDB()
        const conversation = await Conversation.findById(conversationId);
        if (!conversation) {
            return NextResponse.json({ message: "Conversation not found" });
        }


        const unreadCount : any = {_id : '', count : 0}

        for(let i = conversation.messages.length-1; i>=0; i--) {
            if(conversation.messages[i].seen == true) {
                break;
            }

            if(conversation.messages[i].senderId != conversation.users[0]) {
                unreadCount._id = conversation.messages[i].senderId
                unreadCount.count = unreadCount.count + 1
            }

        }
        return NextResponse.json(unreadCount);
    } catch (error) {
        console.error(error);
        throw new Error("Failed to mark conversation as seen");
    }
}