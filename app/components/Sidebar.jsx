"use client"

import {HiOutlineClock, HiOutlineDocumentText} from "react-icons/hi"
import { MdSchool } from "react-icons/md";
import { LuLayoutDashboard } from "react-icons/lu";
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";


const routes = [
    {
        label: "Dashboard",
        icon: <LuLayoutDashboard size="1.2rem" />,
        href: "/dashboard",
        color: "text-sky-500",
    },
    {
        label: "Log My Hours",
        icon: <HiOutlineClock size="1.3rem" />,
        href: "/attendance/week1",
        color: "text-pink-700"
    },
    {
        label: "Training",
        icon: <MdSchool size="1.3rem" />,
        href: "/training",
        color: "text-amber-600"
    },
    {
        label: "Documents",
        icon: <HiOutlineDocumentText size="1.2rem" />,
        href: "/documents",
        color: "text-emerald-500"
    }
]



export const Sidebar = ({setIsDrawerOpen}) => {

    const path = usePathname();
    const {data: session} = useSession()
    const [numUnwatchedVideos, setNumUnwatchedVideos] = useState(0)


    const handleLinkClick = () => {
        if(setIsDrawerOpen) {
            setIsDrawerOpen(false)
        } else {
            return;
        }
    }


    const getTrainingVideosStatus = async () => {
        console.log("GetTrainingVideosFIRED")
        console.log("Current teacher is:", session?.user.name.toLowerCase())
        try {
          const res = await fetch("/api/training-videos-status", {
              method: "POST",
              headers: {
                  "Content-Type": "application/json"
              },
              body: JSON.stringify({teacher: session?.user.name.toLowerCase()})
          })
          const {trainingVideos} = await res.json()

          if(trainingVideos === undefined) {
            return setNumUnwatchedVideos(2)
          }
          console.log("Logging trainingVideos from Sidebar:", trainingVideos)

          const unwatchedVideos = 2 - Object.keys(trainingVideos).length

          setNumUnwatchedVideos(unwatchedVideos)
    
    
          } catch (error) {
              console.log("Error with post request:", error)
          }
      }


      useEffect(() => {
        if (session?.user?.name) {
          getTrainingVideosStatus()
        }
      }, [session]);


    return (
        <div className="space-y-4 w-[200px] py-4 flex flex-col h-full bg-[#111827] text-gray-100">
            <div className="px-3 py-2 flex-1">
                <Link href="/dashboard" className="flex items-center pl-3 mb-14">
                    <div className="relative w-8 h-8 mr-4">
                        <Image
                            fill
                            alt="logo"
                            src="/dcam-logo-white.png"
                        />
                    </div>
                    <span className="">
                        DCAM Staff
                    </span>
                </Link>
                <ul className="space-y-1">
                    {routes.map((route) => (
                        <li key={route.href} onClick={handleLinkClick}>
                            <Link href={route.href} className={`flex items-center flex-1 text-sm group p-3 2-full justify-start font-medium cursor-pointer hover:text-gray-100 hover:bg-white/10 rounded-lg transition ${path === route.href && "text-gray-100 bg-white/10"}`}>
                                <span className={`h-5 w-5 mr-3 ${route.color}`}>{route.icon}</span>
                                {route.label}{route.label === "Training" && numUnwatchedVideos > 0 && <span className="ms-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">{numUnwatchedVideos}</span>}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}
