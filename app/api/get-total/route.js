import { connectToStudentsDB } from "@/db/database";
import { Student } from "@/models/models";


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

            // $cond: {
            //   if: {
            //     $or: [
            //       { $eq: ["$attendance.week1", "present"] },
            //       { $eq: ["$attendance.week1", "counted"] }
            //     ]
            //   },
            //   then: "$pay",
            //   else: 0
            // }

            {
                $group: {
                  _id: null,
                  totalPayWeek1: {
                    $sum: {
                      // $cond: [{ $eq: ["$attendance.week1", "present"] }, "$pay", 0]
                      $cond: {
                        if: {
                          $or: [
                            { $eq: ["$attendance.week1", "present"] },
                            { $eq: ["$attendance.week1", "counted"] }
                          ]
                        },
                        then: "$pay",
                        else: 0
                      }
                    }
                  },
                  totalPayWeek2: {
                    $sum: {
                      // $cond: [{ $eq: ["$attendance.week2", "present"] }, "$pay", 0]
                      $cond: {
                        if: {
                          $or: [
                            { $eq: ["$attendance.week2", "present"] },
                            { $eq: ["$attendance.week2", "counted"] }
                          ]
                        },
                        then: "$pay",
                        else: 0
                      }
                    }
                  }
                }
            }    
          ])


        const totalPay = result[0].totalPayWeek1 + result[0].totalPayWeek2

        console.log("Logging totalPay from 'get-total' route:", totalPay)

        return new Response(JSON.stringify({totalPay}), {status: 200})
    } catch (error) {
        console.log("something went wrong with calculating total pay:", error.message)
        return new Response("Failed to get total pay", {status: 500})
    }
}

