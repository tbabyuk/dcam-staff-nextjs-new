"use client"

import { signOut } from "next-auth/react"
import { useSession } from "next-auth/react"
import { SidebarMobile } from "./SidebarMobile"



export const Navbar = () => {

    const getTeacherImage = (teacher) => {

      switch (teacher) {
        case "Giancarlo":
          return "https://firebasestorage.googleapis.com/v0/b/dcam-staff.appspot.com/o/profile_photos%2Fgiancarlo_profile.jpg?alt=media&token=1ead2707-2e5f-4874-a063-5f58c9a1aff6"
        case "Linda":
          return "https://firebasestorage.googleapis.com/v0/b/dcam-staff.appspot.com/o/profile_photos%2Flinda_profile.jpg?alt=media&token=50aa5586-62e5-45c4-8162-56ac63ada21c"
        case "Raul":
          return "https://firebasestorage.googleapis.com/v0/b/dcam-staff.appspot.com/o/profile_photos%2Fraul_profile.jpg?alt=media&token=39b54513-782f-4518-a7bf-b51762de5a9a"
        case "Andrew":
          return "https://firebasestorage.googleapis.com/v0/b/dcam-staff.appspot.com/o/profile_photos%2Fandrew_profile.jpg?alt=media&token=cc650489-4ed8-446f-bbf8-3b4b9569f9c6"
        case "Parand":
          return "https://firebasestorage.googleapis.com/v0/b/dcam-staff.appspot.com/o/profile_photos%2Fparand_profile.jpg?alt=media&token=fc23a0ce-6669-4e02-b223-5c96c40ee354"
        case "Julia":
          return "https://firebasestorage.googleapis.com/v0/b/dcam-staff.appspot.com/o/profile_photos%2Fjulia_profile.jpg?alt=media&token=d662a38d-ca21-4eea-bbb0-3ed659bd8288"
        case "Anna":
          return "https://firebasestorage.googleapis.com/v0/b/dcam-staff.appspot.com/o/profile_photos%2Fanna_profile.jpg?alt=media&token=40c58f3c-57c2-482c-bb53-3890ad8ab49c"
        default:
          return "https://firebasestorage.googleapis.com/v0/b/dcam-staff.appspot.com/o/profile_photos%2Ffemale_profile.jpg?alt=media&token=57d1586b-1c07-4c8b-accf-be33aca3f917"
      }
    }

    const {data: session} = useSession()


    console.log("logging session from Navar:", session)

    return (
        <nav className="px-4 h-[52px] bg-[#375681] text-gray-100 border-b-2 border-gray-200 flex items-center relative">
            <SidebarMobile />
            <div className="flex gap-4 ms-auto absolute right-4">
                {session?.user && (<span className="flex items-center mr-4">Hello, {session?.user.name}</span>)}
                <img src={getTeacherImage(session?.user.name)} className="h-[34px] rounded-full" />
                {session?.user && (<button className="btn btn-outline btn-sm text-gray-100 z-50" onClick={() => signOut({ callbackUrl: "/" })}>Log Out</button>)}
            </div>
        </nav>
    )
  }