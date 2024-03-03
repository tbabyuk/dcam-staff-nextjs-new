"use client"

import { signOut } from "next-auth/react"
import { useSession } from "next-auth/react"

export const Navbar = () => {

    const {data: session} = useSession()


    console.log("logging session from Navar:", session)

    return (
      <nav className="px-4 h-[53px] bg-[#375681] text-gray-100 flex justify-between items-center border-b-2 border-gray-200">
        {/* <img src="/dcam-logo-white-long.png" className="h-[30px]" /> */}
        <div></div>
        <div></div>
        <div className="flex gap-4">
          {session?.user && (<span className="flex items-center mr-4">Hello, {session?.user.name}</span>)}
          <img src="/avatar1.jpg" className="h-[34px] rounded-full" />
          {session?.user && (<button className="flex items-center" onClick={() => signOut()}>Log Out</button>)}

        </div>
      </nav>
    )
  }