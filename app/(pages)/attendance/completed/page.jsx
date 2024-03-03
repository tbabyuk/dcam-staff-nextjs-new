"use client"

import { usePayday } from "@/app/hooks/usePayday"
import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"


const CompletedPage = () => {

  const router = useRouter()
  const {data: session} = useSession()
  const {closestPayday} = usePayday()
  const [errorMessage, setErrorMessage] = useState("")
  const [payTotal, setPayTotal] = useState(null)



  const notifyPaySubmitted = async () => {

    try {
      const res = await fetch("/api/notify", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({pay: payTotal, teacher: session?.user.name, payday: closestPayday})
    })
        const {message} = await res.json()
        console.log("logging notify result message from completed page", message)

    } catch (error) {
      console.log("error sending notify email:", error.message)
    }
  }


  const getPayTotal = async () => {

    try {
      const res = await fetch("/api/get-total", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({teacher: session?.user.name.toLowerCase()})
    })
        const {totalPay} = await res.json()
        setPayTotal(totalPay)

    } catch (error) {
      console.log("error getting total pay:", error.message)
    }

  }


  useEffect(() => {

  // check if attendance for both week 1 and 2 has been submitted
  const checkAttendanceStatus = async () => {

    try {
      const res = await fetch("/api/check-meta", {
          method: "POST",
          headers: {
              "Content-Type": "application/json"
          },
          body: JSON.stringify({teacher: session?.user.name.toLowerCase()})
      })
          const result = await res.json()

          if(result[0].week1Submitted && result[0].week2Submitted) {
              // get total pay owed
              getPayTotal()
              return;
          } else {
              setErrorMessage("Please complete your attendance. Redirecting...")
              setTimeout(() => {router.push("/attendance/week1")}, 3000)
              return;
          }

      } catch (error) {
          console.log("Error fetching meta data:", error)
      }
    }

    checkAttendanceStatus()
  }, [session])


  useEffect(() => {
    if(payTotal !== null) {
      notifyPaySubmitted();
    }
  }, [payTotal]);
  



  return (
    <main className="page-container">
      
      <p className="text-center mb-6">
            {errorMessage 
                ? (<span className="text-red-600">{errorMessage}</span>)
                : (<span className="text-green-600">
                        Your attendance for the <span className="font-semibold">{closestPayday}</span> payday has been submitted!<br /><br /> 
                        Your total for this pay period is <span className="font-semibold">${payTotal && payTotal.toFixed(2)}</span><br /><br />
                        (Keep in mind that this total might be adjusted depending on the accuracy of your submission and any additional pay owed to you)
                   </span>)
            }

      </p>
    </main>
  )
}

export default CompletedPage