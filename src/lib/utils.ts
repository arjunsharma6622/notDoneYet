import { type ClassValue, clsx } from "clsx";
import mongoose from "mongoose";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}



export const timeAgo = (dateString: string): string => {
  const inputDate = new Date(dateString);
  const now = new Date();

  const diffInSeconds = Math.floor((now.getTime() - inputDate.getTime()) / 1000);

  const minute = 60;
  const hour = minute * 60;
  const day = hour * 24;
  const week = day * 7;
  const month = day * 30; // Simplified month duration
  const year = day * 365; // Simplified year duration

  if (diffInSeconds < minute) {
      return "just now";
  }

  if (diffInSeconds < hour) {
      const minutes = Math.floor(diffInSeconds / minute);
      return `${minutes} min`;
  }

  if (diffInSeconds < day) {
      const hours = Math.floor(diffInSeconds / hour);
      return `${hours} hr`;
  }

  if (diffInSeconds < week) {
      const days = Math.floor(diffInSeconds / day);
      return `${days} day${days > 1 ? 's' : ''}`;
  }

  if (diffInSeconds < month) {
      const weeks = Math.floor(diffInSeconds / week);
      return `${weeks} week${weeks > 1 ? 's' : ''}`;
  }

  if (diffInSeconds < year) {
      const months = Math.floor(diffInSeconds / month);
      return `${months} month${months > 1 ? 's' : ''}`;
  }

  const years = Math.floor(diffInSeconds / year);
  return `${years} year${years > 1 ? 's' : ''}`;
};


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

