"use client"

import { useState } from "react"
import { StudentRow } from "../components/StudentRow"
import { usePathname } from "next/navigation"
import { useSession } from "next-auth/react"



export const AttendanceForm = ({students}) => {


   const [attendance, setAttendance] = useState([])
   const path = usePathname()
   const session = useSession()


   const handleSubmitAttendance = async (e) => {
        e.preventDefault()
        console.log("submitting this attendance:", attendance)

        // send attendance data to API
        try {
            const res = await fetch("/api/submit", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({attendance, teacher: session.data.user.name.toLowerCase(), week: path === "/attendance/week1" ? "week1Submitted" : "week2Submitted" })
            })
            const {message} = await res.json()

            if(message === "success") {
                location.reload()
            }

            // if(path === "/attendance/week1" && message === "success") {
            //     console.log("Week 1 Attendance submitted successfully! Redirecting to Week 2 attendance...")
            //     setTimeout(() => {router.push("/attendance/week2")}, 2000)
            // } else {
            //     console.log("Week 2 Attendance submitted successfully!")
            //     setTimeout(() => {router.push("/attendance/success")}, 2000)
            // }
            } catch (error) {
                console.log("Error with post request:", error)
            }
   }



  return (
    <form onSubmit={handleSubmitAttendance}>
        <table className="mx-auto">
            <thead>
                <tr className="font-semibold text-gray-600 bg-gray-300 text-center">
                    <td className="py-2 px-3 sm:px-6 hidden md:block text-center">Count</td>
                    <td className="py-2 px-3 sm:px-6 text-center">Student</td>
                    <td className="py-2 px-3 sm:px-6 text-center">Attendance</td>
                    <td className="py-2 px-3 sm:px-6 hidden md:block text-center">Duration</td>
                    <td className="py-2 px-3 sm:px-6 text-center">Status</td>
                </tr>
            </thead>
            <tbody>
                {students && students.map((student, index) => (
                    <StudentRow key={index} student={student} index={index} setAttendance={setAttendance} />
                ))}
            </tbody>
        </table>
        <button type="submit" className="submit-btn">Submit Attendance</button>
    </form>
  )
}