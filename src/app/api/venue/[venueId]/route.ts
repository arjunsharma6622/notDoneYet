import { Venue } from "@/lib/models/venue"
import { connectDB } from "@/lib/utils"
import { NextRequest, NextResponse } from "next/server"


export const GET = async (request : NextRequest, {params} : {params: {venueId: string}}) => {
    try{
        await connectDB()
        const venueId = params.venueId
        const venue = await Venue.findById(venueId)
        return NextResponse.json(venue)
    }
    catch(err){
        console.log(err)
        throw new Error("Failed Fetching Venues!")
    }
}

export const PATCH = async (request : NextRequest, {params} : {params: {venueId: string}}) => {
    try{
        await connectDB()
        const body = await request.json()
        const venueId = params.venueId
        const venue = await Venue.findByIdAndUpdate(venueId, body)
        return NextResponse.json(venue)
    }
    catch(err){
        console.log(err)
        throw new Error("Failed Fetching Users!")
    }
}