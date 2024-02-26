import { connectToStudentsDB } from "@/db/database";
import { Student } from "@/models/StudentSchema";

export const POST = async (request) => {
    

    const {attendance, teacher} = await request.json()

    console.log("logging request from /submit API:", attendance, teacher)


    try {
        await connectToStudentsDB();

        attendance.forEach( async (student) => {
            await Student.updateOne({"teacher": teacher, "name": `${student.name}`}, 
                                {$set: {"attendance.week1": `${student.week1}`}})

        })
        console.log("from API: block fired")
        return new Response(JSON.stringify({message: "success"}, {status: 200}))
    } catch (error) {
        return new Response("Failed to submit attendance", {status: 500})
    }
}

