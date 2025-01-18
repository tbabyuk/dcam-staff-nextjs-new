import { AttendanceHeader } from "@/app/components/AttendanceHeader"


export default function AttendanceLayout({children}) {
  return (
    <div className="">
        <AttendanceHeader />
        {children}
    </div>
 )
}