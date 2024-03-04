"use client"

import { useSession } from "next-auth/react"
import { useEffect } from "react"
import { usePayday } from "@/app/hooks/usePayday"



const WelcomePage = () => {

  const {data: session} = useSession()
  const {closestPaydayUnformatted} = usePayday()


  useEffect(() => {
    
    const checkDateSubmitted = async () => {

      console.log("checkDateSubmitted FIRED")

      try {
        const res = await fetch("/api/check-submit", {
          method: "POST",
          headers: {
              "Content-Type": "application/json"
          },
          body: JSON.stringify({teacher: session.user.name, closestPayday: closestPaydayUnformatted})
      })

      const {message} = await res.json()

      console.log("from check-submit API call:", message)

      } catch (error) {
        console.log("An error occured while checking DateSubmitted")
      }
    }

    checkDateSubmitted()

  }, [session])


  return (
    <main className="page-container text-center">Welcome, {session?.user.name}! What would you like to do today?</main>
  )
}

export default WelcomePage