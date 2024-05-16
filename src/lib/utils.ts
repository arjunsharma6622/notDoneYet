import { type ClassValue, clsx } from "clsx";
import mongoose from "mongoose";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const categories = [
  "clothing",
  "footware",
  "accessories"
]

export const productSizes : Record<string, string[]> = {
  "clothing": ["XS", "S", "M", "L", "XL", "XXL"],
  "footware" : ["6", "7", "8", "9", "10", "11", "12"],
  "accessories" : ["XS", "S", "M", "L", "XL", "XXL"]
}

export const genders = ["male", "female", "unisex"];

export const API_HEAD =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8000/api"
    : "https://notdoneyet-server.vercel.app/api";

export const CLIENT_HEAD = 
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : "https://notdoneyet.vercel.app";

type ConnectionObject = {
  isConnected?: number;
};
const connection: ConnectionObject = {};

async function connectDB(): Promise<void> {
  if (connection.isConnected) {
    console.log("Already connected to database");
    return;
  }

  try {
    const db = await mongoose.connect(process.env.MONGO_URL || "", {});
    connection.isConnected = db.connections[0].readyState;
    console.log("DB Connected Successfully!");
  } catch (error) {
    console.log("DB Connection Failed :( ", error);
    process.exit(1);
  }
}

export { connectDB };
