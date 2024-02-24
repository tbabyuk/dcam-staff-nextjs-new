"use client"

import { useState, useEffect } from "react"
import { StudentRow } from "../components/StudentRow"


export const AttendanceForm = () => {


   const [students, setStudents] = useState([])
   const [attendance, setAttendance] = useState([])

   const handleSubmitAttendance = (e) => {
        e.preventDefault()
        console.log("submitting...", attendance)
   }

   console.log("Logging attendance from Form:", attendance)


   useEffect(() => {

      const fetchStudents = async () => {
        try {
            const res = await fetch("/api/get-students")
            const data = await res.json()
            setStudents([...data])
        } catch (error) {
            console.log("Error fetching students:", error)
        }
      }
      fetchStudents()
   }, [])



  return (
    <form onSubmit={handleSubmitAttendance}>
        <table className="mx-auto mt-10">
        <thead>
            <tr className="font-semibold text-gray-800 bg-gray-200">
            <td className="py-2 px-8">Count</td>
            <td className="py-2 px-8">Student</td>
            <td className="py-2 px-8">Attendance</td>
            <td className="py-2 px-8">Duration</td>
            <td className="py-2 px-8">Status</td>
            </tr>
        </thead>
        <tbody>
            {students && students.map((student, index) => (
                <StudentRow key={index} student={student} index={index} setAttendance={setAttendance} />
            ))}
        </tbody>
        </table>
        <button type="submit">Submit</button>
    </form>
  )
}