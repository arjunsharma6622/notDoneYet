import { Schema, models, model } from "mongoose";

const conversationSchema = new Schema(
  {
    users: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    messages: [
      {
        senderId: {
          type: Schema.Types.ObjectId,
          ref: "User",
        },
        content: {
          type: String,
          required: true,
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
        seen : {type: Boolean, default: false}
      },
    ],
  },
  {
    timestamps: true,
  },
);

export const Conversation =
  models.Conversation || model("Conversation", conversationSchema);
