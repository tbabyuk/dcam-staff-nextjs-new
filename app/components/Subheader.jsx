"use client"

import { usePayday } from "../hooks/usePayday"


export const Subheader = () => {
  
  const {closestPaydayFormatted} = usePayday()

  return (
    <div className="h-14 bg-gray-200 text-gray-700 flex flex-col justify-center items-center">
        <p>Your next payday is:</p> 
        <span className="font-semibold">{closestPaydayFormatted}</span>    
    </div>
  )
}