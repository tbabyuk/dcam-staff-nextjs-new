"use client"

import { useSession } from "next-auth/react"


const ClientMemberPage = () => {
  

  const session = useSession()

  console.log("logging session from client component ClientMemberPage", session.status)

  if(session.status === "authenticated") {
    return (
      <h1 className="text-2xl font-semibold text-center">Client Member Session</h1>
    )
  } else {
    return <div>OOps, you need to sign in!</div>
  }

  return <div>Hello</div>

}

export default ClientMemberPage