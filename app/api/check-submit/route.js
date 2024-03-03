import { connectToStudentsDB } from "@/db/database";
import { Meta } from "@/models/models";
import { NextResponse } from "next/server";


export const POST = async (request) => {
    
    const {teacher, closestPayday} = await request.json()

    console.log("logging closestPayday from check-submit API", closestPayday, teacher)

    try {
        await connectToStudentsDB()
        const {payday} = await Meta.findOne({"teacher": teacher.toLowerCase()}, {_id: 0, payday: 1})

        // When closestPayday is bigger than the payday last submitted, reset all attendance and update the payday field with the closest payday

        if (new Date(closestPayday) > new Date(payday)) {

            await Meta.updateOne({"teacher": teacher.toLowerCase()}, {$set: {"week1Submitted": false, "week2Submitted": false, "payday": date1}})
        }

        return NextResponse.json({message: "Submit date check performed successfully"}, {status: 200})

    } catch (error) {
        return new Response("Failed to fetch students", {status: 500})
    }
}

