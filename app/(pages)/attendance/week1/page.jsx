"use client"

import { AttendanceForm } from "../../../components/AttendanceForm"
import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"



const WeekOneAttendancePage = () => {


  const session = useSession()
  const router = useRouter()
  const [students, setStudents] = useState([])
  const [successMessage, setSuccessMessage] = useState("")
  const [errorMessage, setErrorMessage] = useState("")



  useEffect(() => {

    const fetchStudents = async () => {
        
      try {
          const res = await fetch("/api/get-students", {
              method: "POST",
              headers: {
                  "Content-Type": "application/json"
              },
              body: JSON.stringify({teacher: session.data.user.name})
          })
              const data = await res.json()
              setStudents([...data])
          } catch (error) {
              console.log("Error fetching students:", error)
          }
    }


    const checkAttendanceStatus = async () => {

      try {
        const res = await fetch("/api/check-meta", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({teacher: session.data.user.name})
        })
            const result = await res.json()

            console.log("loggin result from front end checkWeekMeta:", result)

            if(result[0].week1Submitted && result[0].week2Submitted) {
                router.push("/attendance/completed")
                return;
            } else if (result[0].week1Submitted) {
                setErrorMessage("Week 1 attendance already submitted. Redirecting to week 2...")
                setTimeout(() => {router.push("/attendance/week2")}, 3000)
                return;
            }

            fetchStudents()


        } catch (error) {
            console.log("Error fetching meta data:", error)
        }

    }

    checkAttendanceStatus()

  }, [session])

  return (
    <main className="px-4 md:px-24 pt-6 h-full">
        <p className="text-center mb-6">
            {successMessage && (<span className="text-green-500">{successMessage}</span>)}
            {errorMessage && (<span className="text-red-500">{errorMessage}</span>)}
        </p>
        <AttendanceForm students={students} />
    </main>
  )
}

export default WeekOneAttendancePage