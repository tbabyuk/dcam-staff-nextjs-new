import { connectToStudentsDB } from "@/db/database";
import { Student, Meta } from "@/models/StudentSchema";

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
    


    try {
        await connectToStudentsDB();

        attendance.forEach( async (student) => {
            await Student.updateOne({"teacher": teacher, "name": `${student.name}`}, 
                                {$set: {[getKey()]: `${student.status}`}})

        })
        console.log("from API: block fired")

        console.log("Loggin week from API: =============", week)

        await Meta.updateOne({"teacher": teacher}, {$set: {[week]: true}})

        console.log("Week 1 submission updated successfully.");

        return new Response(JSON.stringify({message: "success"}, {status: 200}))
    } catch (error) {
        return new Response("Failed to submit attendance", {status: 500})
    }




}

