"use client"

import { usePayday } from "../hooks/usePayday"
import { usePathname } from "next/navigation"

export const Subheader = () => {
  
  const path = usePathname()
  const {closestPayday, weekOneBoundaries, weekTwoBoundaries} = usePayday()

  console.log("logging closest payday from Subheader:", closestPayday)

  return (
    <div className="h-auto text-[0.9rem] py-4 bg-gray-200 text-gray-700 flex flex-col justify-center items-center">
        <p className="px-4 pb-2">Your next payday is:&nbsp;&nbsp;<span className="font-semibold">{closestPayday}</span></p>
        {path === "/attendance/week1" ? 
          (<p className="px-4 pt-2 text-center border-t-2 border-t-gray-300">
          Submitting attendance for week 1 of 2:&nbsp;&nbsp;<span className="font-semibold">{weekOneBoundaries.start} - {weekOneBoundaries.end}</span></p>)
        : path === "/attendance/week2" ? 
          (<p className="pt-2 border-t-2 border-t-gray-300">
          Submitting attendance for week 2 of 2:&nbsp;&nbsp;<span className="font-semibold">{weekTwoBoundaries.start} - {weekTwoBoundaries.end}</span></p>) 
        : ""
        }
    </div>
  )
}