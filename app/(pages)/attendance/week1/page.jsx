"use client"

import { AttendanceForm } from "../../../components/AttendanceForm"
import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"


const WeekOneAttendancePage = () => {

  const router = useRouter()
  const {data: session} = useSession()
  const [students, setStudents] = useState([])
  const [errorMessage, setErrorMessage] = useState("")



  console.log("loggin session info from attendance/week1", session)

  useEffect(() => {

    const fetchStudents = async () => {
        
      try {
          const res = await fetch("/api/get-students", {
              method: "POST",
              headers: {
                  "Content-Type": "application/json"
              },
              body: JSON.stringify({teacher: session?.user.name.toLowerCase()})
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
            body: JSON.stringify({teacher: session.user.name.toLowerCase()})
        })
            const result = await res.json()

            // console.log("logging result form check-meta API.................:", result)

            if(result[0].week1Submitted && result[0].week2Submitted) {
                router.push("/attendance/completed")
                return;
            } else if (result[0].week1Submitted) {
                setErrorMessage("Week 1 attendance already submitted. Redirecting to week 2...")
                setTimeout(() => {router.push("/attendance/week2")}, 1000)
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
        <div className="py-24 px-8 md:px-24 h-[100%]">
            <p className="text-center mb-6">
                {errorMessage && (<span className="text-red-500">{errorMessage}</span>)}
            </p>
            <AttendanceForm students={students} />
        </div>
    )
}

export default WeekOneAttendancePage