"use client"

import { BsCheckCircle, BsXCircle, BsCircle } from "react-icons/bs"
import { useState } from "react"



export const StudentRow = ({student, index, setAttendance}) => {

  const [attendanceStatus, setAttendanceStatus] = useState("")

  const handleSelect = (e) => {
    setAttendanceStatus(e.target.value)

    const attendanceObject = {
        name: student.name,
        week1: e.target.value
    }
    setAttendance((prev) => [...prev, attendanceObject])
  }

  

  const setIcon = () => {
    if(attendanceStatus === "present") {
        return <BsCheckCircle size="1.1rem" color="green" className="mx-auto" />
    } else if (attendanceStatus === "absent") {
        return <BsXCircle size="1.1rem" color="red" className="mx-auto" />
    } else if (attendanceStatus === "counted") {
        return <BsCheckCircle size="1.1rem" color="orange" className="mx-auto" />
    } else {
        return <BsCircle size="1.1rem" className="mx-auto" />
    }
  }
    

  return (
    <tr className="text-center bg-gray-100">
        <td className="py-2">{index + 1}</td>
        <td className="text-left">{student.name}</td>
        <td>
            <select defaultValue={"attendance"} onChange={(e) => handleSelect(e)} className="cursor-pointer">
                <option value="attendance">attendance</option>
                <option value="present">present</option>
                <option value="absent">absent</option>
                <option value="counted">absent (late notice)</option>
            </select>
        </td>
        <td>{student.duration}</td>
        <td>{setIcon()}</td>
    </tr>
  )
}