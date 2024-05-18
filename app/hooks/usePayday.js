"use client"


// Figure out the closest payday to current date

import { useState, useEffect } from "react"
import { subDays, closestTo, format } from "date-fns"



export const usePayday = () => {


  const [closestPaydayUnformatted, setClosestPaydayUnformatted] = useState("")
  const [closestPaydayFormatted, setClosestPaydayFormatted] = useState("")
  const [weekOneBoundaries, setWeekOneBoundaries] = useState({
    start: null,
    end: null
  })
  const [weekTwoBoundaries, setWeekTwoBoundaries] = useState({
    start: null,
    end: null
  })

  const getWeekOneBoundaries = (closest) => {
    const weekOneStartDate = subDays(closest, 18)
    const weekOneEndDate = subDays(closest, 12)
    setWeekOneBoundaries((prev) => ({...prev, start: format(weekOneStartDate, "MMM d, yyy" ), end: format(weekOneEndDate, "MMM d, yyy")}))
  }

  const getWeekTwoBoundaries = (closest) => {
    const weekTwoStartDate = subDays(closest, 11)
    const weekTwoEndDate = subDays(closest, 5)
    setWeekTwoBoundaries((prev) => ({...prev, start: format(weekTwoStartDate, "MMM d, yyy" ), end: format(weekTwoEndDate, "MMM d, yyy")}))
  }

  const getClosestPayday = () => {
    const today = new Date()
    const paydayArray = [new Date("2024-03-01"), new Date("2024-03-15"), new Date("2024-03-29"), new Date("2024-04-12"), new Date("2024-04-26"), new Date("2024-05-10"), new Date("2024-05-24"), new Date("2024-06-07"), new Date("2024-06-21")]
  
    const closestPayday = closestTo(today, paydayArray)
    setClosestPaydayUnformatted(closestPayday)
    setClosestPaydayFormatted(format(closestPayday, "MMMM d, yyy")) 
    getWeekOneBoundaries(closestPayday)
    getWeekTwoBoundaries(closestPayday)
  }
  

  useEffect(() => {
    getClosestPayday()
  }, [])

  return {closestPaydayFormatted, closestPaydayUnformatted, weekOneBoundaries, weekTwoBoundaries}
}