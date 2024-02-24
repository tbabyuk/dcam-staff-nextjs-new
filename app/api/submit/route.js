import { connectToDB } from "@/db/database";
import { Student } from "@/models/StudentSchema";


export const POST = async (request) => {
    
    try {
        await connectToDB();

        const prompts = await Prompt.find({}).populate("creator")

        return new Response(JSON.stringify(prompts), {status: 200})
    } catch (error) {
        return new Response("Failed to fetch all prompts", {status: 500})
    }
}

