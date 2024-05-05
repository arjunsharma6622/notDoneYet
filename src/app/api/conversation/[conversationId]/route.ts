import { Conversation } from "@/lib/models/conversation";
import { connectDB } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  request: NextRequest,
  { params }: { params: { conversationId: string } },
) => {
  const conversationId = params.conversationId;
  try {
    await connectDB();

    const messages = await Conversation.findOne({ _id: conversationId });

    return NextResponse.json(messages);
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch conversation messages");
  }
};

export const POST = async (
  request: NextRequest,
  { params }: { params: { conversationId: string } },
) => {
  const { senderId, content } = await request.json();
  const conversationId = params.conversationId;

  try {
    await connectDB()
    // Find the conversation by ID
    const conversation = await Conversation.findById(conversationId);
    if (!conversation) {
      return NextResponse.json({ message: "Conversation not found" });
    }

    // Create a new message object
    const newMessage = {
      senderId: senderId,
      content: content,
    };

    // Add the message to the conversation's messages array
    conversation.messages.push(newMessage);
    await conversation.save();

    const updatedConversation = await Conversation.findById(
      conversationId,
    ).populate({
      path: "users",
      select: "name image bio",
    });

    const recentMsg =
      updatedConversation.messages[updatedConversation.messages.length - 1];

    return NextResponse.json(recentMsg);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Failed to send message" });
  }
};


