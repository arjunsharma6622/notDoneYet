import { type ClassValue, clsx } from "clsx";
import mongoose from "mongoose";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const timeAgo = (dateString: string): string => {
  const inputDate = new Date(dateString);
  const now = new Date();

  const diffInSeconds = Math.floor(
    (now.getTime() - inputDate.getTime()) / 1000,
  );

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
    return `${days} day${days > 1 ? "s" : ""}`;
  }

  if (diffInSeconds < month) {
    const weeks = Math.floor(diffInSeconds / week);
    return `${weeks} week${weeks > 1 ? "s" : ""}`;
  }

  if (diffInSeconds < year) {
    const months = Math.floor(diffInSeconds / month);
    return `${months} month${months > 1 ? "s" : ""}`;
  }

  const years = Math.floor(diffInSeconds / year);
  return `${years} year${years > 1 ? "s" : ""}`;
};

export const categories = ["clothing", "footware", "accessories"];

export const productSizes: Record<string, string[]> = {
  clothing: ["XS", "S", "M", "L", "XL", "XXL"],
  footware: ["6", "7", "8", "9", "10", "11", "12"],
  accessories: ["XS", "S", "M", "L", "XL", "XXL"],
};

export const genders = ["male", "female", "unisex"];

export const amenities = [
  { name: "Restrooms", icon: "restroom.png", category: "Basic Amenities" },
  {
    name: "Drinking Fountains",
    icon: "drinking.png",
    category: "Basic Amenities",
  },
  { name: "Locker Rooms", icon: "locker.png", category: "Basic Amenities" },
  { name: "Changing Rooms", icon: "closet.png", category: "Basic Amenities" },
  { name: "Showers", icon: "shower.png", category: "Basic Amenities" },
  { name: "Parking", icon: "parking.png", category: "Basic Amenities" },
  { name: "Seating Areas", icon: "seats.png", category: "Basic Amenities" },
  { name: "Lighting", icon: "lighting.png", category: "Basic Amenities" },
  { name: "Wi-Fi Access", icon: "wifi.png", category: "Basic Amenities" },
  {
    name: "Charging Stations",
    icon: "charging-station.png",
    category: "Basic Amenities",
  },

  {
    name: "Security Cameras",
    icon: "security-camera.png",
    category: "Security and Accessibility",
  },
  {
    name: "Security Personnel",
    icon: "security-personnel.png",
    category: "Security and Accessibility",
  },
  {
    name: "First Aid Stations",
    icon: "first-aid.png",
    category: "Security and Accessibility",
  },
  {
    name: "Handicapped Accessibility",
    icon: "handicap-accessibility.png",
    category: "Security and Accessibility",
  },

  { name: "Snack Bar", icon: "snack-bar.png", category: "Food and Beverage" },
  { name: "Cafeteria", icon: "cafeteria.png", category: "Food and Beverage" },
  {
    name: "Vending Machines",
    icon: "vending-machine.png",
    category: "Food and Beverage",
  },
  {
    name: "Water Stations",
    icon: "water-station.png",
    category: "Food and Beverage",
  },

  {
    name: "VIP Lounges",
    icon: "vip-lounge.png",
    category: "Specialized Areas",
  },
  {
    name: "Press Rooms",
    icon: "press-room.png",
    category: "Specialized Areas",
  },
  {
    name: "Interview Areas",
    icon: "interview-area.png",
    category: "Specialized Areas",
  },

  {
    name: "Scoreboards",
    icon: "scoreboard.png",
    category: "Additional Services",
  },
  {
    name: "Merchandise Shops",
    icon: "merchandise-shop.png",
    category: "Additional Services",
  },
  {
    name: "Ticket Counters",
    icon: "ticket-counter.png",
    category: "Additional Services",
  },
  {
    name: "Information Desks",
    icon: "information-desk.png",
    category: "Additional Services",
  },
];

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
