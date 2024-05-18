"use client"

import { signOut } from "next-auth/react"
import { useSession } from "next-auth/react"
import { SidebarMobile } from "./SidebarMobile"



export const Navbar = () => {

    const getTeacherImage = (teacher) => {

      switch (teacher) {
        case "Chloe":
          return "https://firebasestorage.googleapis.com/v0/b/dcam-staff.appspot.com/o/profile_photos%2Fchloe_profile.jpg?alt=media&token=febda0cf-b8a5-4246-9c4a-33344a00ecdf"
        case "Giancarlo":
          return "https://firebasestorage.googleapis.com/v0/b/dcam-staff.appspot.com/o/profile_photos%2Fgiancarlo_profile.jpg?alt=media&token=1ead2707-2e5f-4874-a063-5f58c9a1aff6"
        case "Linda":
          return "https://firebasestorage.googleapis.com/v0/b/dcam-staff.appspot.com/o/profile_photos%2Flinda_profile.jpg?alt=media&token=50aa5586-62e5-45c4-8162-56ac63ada21c"
        case "Raul":
          return "https://firebasestorage.googleapis.com/v0/b/dcam-staff.appspot.com/o/profile_photos%2Fraul_profile.jpg?alt=media&token=39b54513-782f-4518-a7bf-b51762de5a9a"
        case "Senya":
          return "https://firebasestorage.googleapis.com/v0/b/dcam-staff.appspot.com/o/profile_photos%2Fsenya_profile.JPG?alt=media&token=79a21e2b-eac8-450b-94b8-7983a5a33b0f"
        case "Taisiya":
          return "https://firebasestorage.googleapis.com/v0/b/dcam-staff.appspot.com/o/profile_photos%2Ftaisiya_profile.png?alt=media&token=85e990e0-ef3b-4b20-ba35-67ba2457c4c7"
        case "Andrew":
          return "https://firebasestorage.googleapis.com/v0/b/dcam-staff.appspot.com/o/profile_photos%2Fandrew_profile.jpg?alt=media&token=cc650489-4ed8-446f-bbf8-3b4b9569f9c6"
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