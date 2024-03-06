import { connectToStaffDB } from "@/db/database";
import { Student } from "@/models/models";
import { NextResponse } from "next/server";


export const POST = async (request) => {

    const {teacher} = await request.json()

    console.log("loggin teacher from get-students API:", teacher)

    try {
        await connectToStaffDB()
        const students = await Student.find({"teacher": teacher})

        console.log("loggin students from get-students API:", students)

        // return new Response(JSON.stringify(students), {status: 200})
        return NextResponse.json(students, {status: 200})
    } catch (error) {
        // return new Response("Failed to fetch students", {status: 500})
        return NextResponse.json({message: "Failed to fetch students"}, {status: 500})
    }
}