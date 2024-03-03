import { connectToStudentsDB } from "@/db/database";
import { Student, Meta } from "@/models/models";

export const POST = async (request) => {
    

    const {attendance, teacher, week} = await request.json()

    console.log("logging request from /submit API:", attendance, teacher, week)

    const getKey = () => {
        if(week === "week1Submitted") {
            return "attendance.week1"
        } else {
            return "attendance.week2"
        }
    }

    console.log("from submit API:", Object.entries(attendance))

    
    try {
        // await connectToStudentsDB();

        // OLD CODE WHEN ATTENDANCE WAS AN ARRAY
        // attendance.forEach( async (student) => {
        //     await Student.updateOne({"teacher": teacher, "name": `${student.name}`}, 
        //                         {$set: {[getKey()]: `${student.status}`}})

        // })

        Object.entries(attendance).forEach( async ([key, value]) => {
            await Student.updateOne({"teacher": teacher, "name": key },
                                    {$set: {[getKey()]: value}})
        })

        await Meta.updateOne({"teacher": teacher}, {$set: {[week]: true}})
        
        console.log("Week 1 submission updated successfully.");

        return new Response(JSON.stringify({message: "success"}, {status: 200}))
    } catch (error) {
        return new Response("Failed to submit attendance", {status: 500})
    }
}

