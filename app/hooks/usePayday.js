// Figure out the closest payday based on today's date

import { closestTo } from "date-fns"


export const usePayday = () => {
  
  const today = new Date()
  const paydayArray = [new Date("2024, 03, 01"), new Date("2024, 03, 12"), new Date("2024, 03, 26") ]

  const closestPayday = closestTo(today, paydayArray)

  const closestPaydayFormatted = closestPayday.toLocaleString("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
    year: "numeric"
  })

  console.log(closestPaydayFormatted)

  return {closestPaydayFormatted}
}