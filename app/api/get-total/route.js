import { connectToStudentsDB } from "@/db/database";
import { Student } from "@/models/StudentSchema";


export const POST = async (request) => {
    
    const {teacher} = await request.json()

    console.log("logging teacher name from /get-total API:", teacher)

    try {
        await connectToStudentsDB()

        const result = await Student.aggregate([
            {
                $match: {
                  teacher: teacher,
                }
            },
            {
                $group: {
                  _id: null,
                  totalPayWeek1: {
                    $sum: {
                      $cond: [{ $eq: ["$attendance.week1", "present"] }, "$pay", 0]
                    }
                  },
                  totalPayWeek2: {
                    $sum: {
                      $cond: [{ $eq: ["$attendance.week2", "present"] }, "$pay", 0]
                    }
                  }
                }
            }

                
          ])

        const totalPay = result[0].totalPayWeek1 + result[0].totalPayWeek2

        return new Response(JSON.stringify({totalPay}), {status: 200})
    } catch (error) {
        console.log("something went wrong with calculating total pay:", error.message)
        return new Response("Failed to get total pay", {status: 500})
    }
}

