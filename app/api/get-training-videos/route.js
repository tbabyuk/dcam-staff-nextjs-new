import { connectToStaffDB } from "@/db/database";
import { TrainingVideo } from "@/models/models";
import { NextResponse } from "next/server";



export const POST = async (request) => {

    const {teacher, instrument} = await request.json()

    console.log("logging TEACHER and INSTRUMENT from get-training-videos API:", teacher, instrument)

    try {
        await connectToStaffDB()
        const result = await TrainingVideo.find({ instrument: instrument })

        // await Meta.updateOne({"teacher": teacher}, {$set: {[`trainingVideos.${watchedVideo}`]: true}})
        return NextResponse.json({videoList: result}, {status: 200})
    } catch (error) {
        console.log("Logging mongoDB error:", error)
        return NextResponse.json({message: "Failed to update watched video"}, {status: 500})
    }

    // return NextResponse.json({message: "okay"}, {status: 200})

}



