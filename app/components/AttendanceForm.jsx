"use client"

import { useState, useEffect } from "react"
import { StudentRow } from "../components/StudentRow"



export const AttendanceForm = ({students}) => {


   const [attendance, setAttendance] = useState([])


   const handleSubmitAttendance = async (e) => {
        e.preventDefault()
        console.log("submitting...", attendance)
        // send attendance data to API

        try {
            const res = await fetch("/api/submit", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({attendance, teacher: "taisiya"})
            })
            const {message} = await res.json()
            if(message === "success") {
                console.log("Week 1 Attendance submitted successfully! Redirecting to Week 2 attendance...")
                setTimeout(() => {router.push("/attendance/week2")}, 2000)
            }
            } catch (error) {
                console.log("Error with post request:", error)
            }
   }


   console.log("Logging attendance from Form:", attendance)



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