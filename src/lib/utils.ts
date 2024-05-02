import { type ClassValue, clsx } from "clsx"
import mongoose from "mongoose";
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}




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
  
  export {connectDB};