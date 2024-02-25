import { connectToDB } from "@/db/database";
import { Student } from "@/models/StudentSchema";

export const POST = async (request) => {
    

    const {attendance} = await request.json()

    console.log("logging request from API:", attendance)


    try {
        await connectToDB();

        attendance.forEach( async (student) => {
            await Student.updateOne({"teacher": "raul", "name": `${student.name}`}, 
                                {$set: {"attendance.week1": `${student.week1}`}})

        })

        console.log("from API: update successful")

        // return new Response(JSON.stringify(prompts), {status: 200})
    } catch (error) {
        return new Response("Failed to fetch all prompts", {status: 500})
    }
}

