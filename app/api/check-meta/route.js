import { connectToStudentsDB } from "@/db/database";
import { Meta } from "@/models/models";

export const POST = async (request) => {
    
    const {teacher} = await request.json()

    console.log("logging teacher name from /check-meta API:", teacher)

    try {
        await connectToStudentsDB()
        const result = await Meta.find({"teacher": teacher})

        console.log("logging attendanceSubmitted:", result)

        return new Response(JSON.stringify(result), {status: 200})
    } catch (error) {
        return new Response("Failed to fetch students", {status: 500})
    }
}

