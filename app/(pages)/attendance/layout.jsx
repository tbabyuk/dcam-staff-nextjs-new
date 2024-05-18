
import { Subheader } from "@/app/components/Subheader"


export default function AttendanceLayout({children}) {
  return (
    <div className="">
        <Subheader />
        {children}
    </div>
 )
}