"use client"

import { useState } from "react"
import {HiOutlineClock, HiOutlineDocumentText} from "react-icons/hi"
import Link from "next/link"


export const Sidebar = () => {

  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
        <div className={`${sidebarOpen ? "w-[180px]" : "w-[52px] overflow-hidden"} absolute top-0 left-0 h-screen transition-all duration-500 ease-in-out`} onMouseEnter={() => setSidebarOpen(true)} onMouseLeave={() => setSidebarOpen(false)}>
            <ul className="h-[100vh] bg-[#375681] text-gray-200">
                <li>
                    <Link href="/" className="flex justify-center py-2 mb-14 border-b-2 border-gray-200"><img src="/dcam-logo-white.png" width="35px" /></Link>
                </li>
                <li>
                    <Link href="/attendance/week1" className="flex ps-3 cursor-pointer mb-5"><HiOutlineClock size="28px" className="min-w-[28px] me-2" />{sidebarOpen && (<span className="text-nowrap invisible-to-visible">Log My Hours</span>)}</Link>
                </li>
                <li>
                    <Link href="/documents" className="flex ps-3 cursor-pointer"><HiOutlineDocumentText size="28px" className="min-w-[28px] me-2" />{sidebarOpen && (<span className="text-nowrap invisible-to-visible">My Docs</span>)}</Link>
                </li>
            </ul>
        </div>
    )
}
