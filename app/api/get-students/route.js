import { connectToDB } from "@/db/database";
import { Student } from "@/models/StudentSchema";
// import { NextResponse } from "next/server";


export const GET = async (request) => {

    try {
        await connectToDB()
        const students = await Student.find({})

        return new Response(JSON.stringify(students), {status: 200})
    } catch (error) {
        return new Response("Failed to fetch students", {status: 500})
    }
    
}