"use client"

import { useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"



const WelcomePage = () => {

  const session = useSession()
  const router = useRouter()


  useEffect(() => {
    if(session.status === "unauthenticated") {
      router.push("/")
      return;
    }
  }, [session])


  return (
    <main className="page-container text-center">Welcome, {session?.data?.user?.name}! <br /><br />What would you like to do today?</main>
  )
}

export default WelcomePage