import { Navbar } from "../components/Navbar"
import { Sidebar } from "../components/Sidebar"
import { Subheader } from "../components/Subheader"


export default function PagesLayout({children}) {
  return (
    <>
        <Sidebar />
        <div className="ml-[52px] max-h-[100vh]">
          <Navbar />
          <Subheader />
              <div className="max-h-[calc(100vh-165px)] overflow-y-auto pb-16">
                {children}
              </div>
          </div>
    </>
 )
}