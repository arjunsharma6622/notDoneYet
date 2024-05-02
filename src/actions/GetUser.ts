"use server"

import { User } from "@/lib/models/UserModel";
import { connectDB } from "@/lib/utils"
import mongoose from 'mongoose';


export async function getUser(email: string) {
    try {
        await connectDB();
        const user = await User.findOne({ email });
        return user;
    } catch (error) {
        return (error as Error).message
    }
}