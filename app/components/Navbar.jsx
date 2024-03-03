
// import { auth } from "@/auth"
import Link from "next/link"


export const Navbar = async () => {
    // const session = await auth()


    // console.log("logging session from Navar:", session)
    return (
      <nav className="px-4 h-[53px] bg-[#375681] text-gray-100 flex justify-between items-center border-b-2 border-gray-200">
        {/* <img src="/dcam-logo-white-long.png" className="h-[30px]" /> */}
        <div></div>
        <div></div>
        <div className="flex gap-4">
          {/* {session?.user && (<span className="flex items-center mr-4">Hello, {session.user.name}</span>)} */}
          <img src="/avatar1.jpg" className="h-[34px] rounded-full" />
          {/* {session && session.user ? (<Link href="/api/auth/signout?callbackUrl=/" className="flex items-center">Log Out</Link>) : (<Link href="/api/auth/signin?callbackUrl=/" className="flex items-center">Log In</Link>) } */}
        </div>
      </nav>
    )
  }