import { connectToStaffDB } from "@/db/database";
import { Meta } from "@/models/models";
import { NextResponse } from "next/server";


export const POST = async (request) => {
    
    const {teacher, closestPaydayUnformatted} = await request.json()

    console.log("logging closestPayday from check-submit API", closestPaydayUnformatted, teacher)

    try {
        await connectToStaffDB()
        const {payday} = await Meta.findOne({"teacher": teacher.toLowerCase()}, {_id: 0, payday: 1})

        // When closestPayday is bigger than the payday last submitted, reset all attendance and update the payday field with the closest payday
        
        console.log("loggin closestPayday from 'check-submit' API", closestPaydayUnformatted)

        // const testDate = new Date("2024-03-05T05:00:00.000Z")

        if (new Date(closestPaydayUnformatted) > new Date(payday)) {
            await Meta.updateOne({"teacher": teacher.toLowerCase()}, {$set: {"week1Submitted": false, "week2Submitted": false, "payday": new Date(payday), "totalPay": 0, "notifyEmailSent": false}})
        }

        return NextResponse.json({message: "Submit date check performed successfully"}, {status: 200})

    } catch (error) {
        return NextResponse.json({message: "Failed to fetch students"}, {status: 500})
    }
}

