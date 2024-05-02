import { Schema, models, model } from 'mongoose';

const EventSchema = new Schema({
  name: String,
  description: String,
  startDate: Date,
  endDate: Date,
  startTime: Date,
  endTime: Date,
});

const BookingSchema = new Schema({
  venue: { type: Schema.Types.ObjectId, ref: "Venue" },
  event: EventSchema,
  user: { type: Schema.Types.ObjectId, ref: "User" },
  pricingType: { type: String, enum: ["hourly", "daily"] },
  totalPrice: Number,
  status: {
    type: String,
    enum: ["pending", "approved", "rejected", "completed"],
    default: "pending",
  },
});

export const Booking = models.Booking || model("Booking", BookingSchema);
