import { Conversation } from "@/lib/models/conversation";
import { connectDB } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server"

export const POST = async (request : NextRequest) => {
    const { senderId, recipientId, content } = await request.json();

    console.log("senderId", senderId);
    console.log("recipientId", recipientId);
    console.log("content", content);

    try {
        connectDB();
        console.log("connectd to db")

      let conversation = await Conversation.findOne({
        users: { $all: [senderId, recipientId] },
      });

      console.log("conversation", conversation);

      if (!conversation) {
        // If not, create a new conversation
        conversation = new Conversation({
          users: [senderId, recipientId],
        });
        await conversation.save();
      }

      // Create a new message and add it to the conversation
      const newMessage = {
        senderId: senderId,
        content: content,
      };

      conversation.messages.push(newMessage);
      await conversation.save();

      return NextResponse.json({ message: "Message sent successfully" });
    } catch (error) {
      console.error(error);
      return NextResponse.json({ message: "Failed to send message" });
    }

}
