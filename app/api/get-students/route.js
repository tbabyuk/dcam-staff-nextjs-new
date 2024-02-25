import { connectToDB } from "@/db/database";
import { Student } from "@/models/StudentSchema";
// import { NextResponse } from "next/server";


export const POST = async (request) => {

    const {teacher} = await request.json()

    console.log("loggin teacher from get-students API:", teacher)

    try {
        await connectToDB()
        const students = await Student.find({"teacher": teacher})

        return new Response(JSON.stringify(students), {status: 200})
    } catch (error) {
        return new Response("Failed to fetch students", {status: 500})
    }
    
}