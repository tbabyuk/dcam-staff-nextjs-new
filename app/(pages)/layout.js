import { Navbar } from "../components/Navbar"
import { Sidebar } from "../components/Sidebar"
import { Subheader } from "../components/Subheader"


export default function PagesLayout({children}) {
  return (
    <>
        <Sidebar />
        <div className="ml-[52px]">
        <Navbar />
        <Subheader />
            {children}
        </div>
    </>
 )
}