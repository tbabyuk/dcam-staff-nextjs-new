"use client"

import { useSession } from "next-auth/react"
// How to get sesion data from a server component? Figure out


const WelcomePage = () => {

  const {data: session} = useSession()


  return (
    <main className="page-container text-center">Welcome, {session?.user.name}!</main>
  )
}

export default WelcomePage