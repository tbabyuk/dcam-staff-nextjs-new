import { connectToStaffDB } from "@/db/database";
import { NextResponse } from "next/server";
import { Student, Meta } from "@/models/models";



export const POST = async (request) => {
    
    const {attendance, teacher, week, payday, teacherNotes} = await request.json()

    console.log("logging request from /submit API:", attendance, teacher, week, payday, teacherNotes)

    const getAttendanceKey = () => {
        if(week === "week1Submitted") {
            return "attendance.week1"
        } else {
            return "attendance.week2"
        }
    }

    const getNotesKey = () => {
        if(week === "week1Submitted") {
            return "week1Notes"
        } else {
            return "week2Notes"
        }
    }

    console.log("from submit API:", Object.entries(attendance))

    
    try {
        await connectToStaffDB();

        Object.entries(attendance).forEach( async ([key, value]) => {
            await Student.updateOne({"teacher": teacher, "name": key },
                                    {$set: {[getAttendanceKey()]: value}})
        })

        const result1 = await Meta.updateOne({"teacher": teacher}, {$set: {[week]: true, "payday": payday, [getNotesKey()]: teacherNotes}})
        
        console.log("MongoDB result1:", result1);

        return NextResponse.json({message: "success"}, {status: 200})

    } catch (error) {
        return NextResponse.json({message: "Failed to submit attendance"}, {status: 500})
    }
}

