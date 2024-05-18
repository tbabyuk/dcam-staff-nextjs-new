"use client"

import { RxHamburgerMenu } from "react-icons/rx"
import { Sidebar } from "./Sidebar";



export const SidebarMobile = () => {

    return (
        <>
            <div className="drawer md:hidden">
                <input id="my-drawer" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content">
                    {/* Page content here */}
                    <label htmlFor="my-drawer" className="btn btn-primary drawer-button">
                        <RxHamburgerMenu size="2rem" />
                    </label>
                </div> 
                <div className="drawer-side">
                    <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
                    <Sidebar />
                </div>
            </div>
        </>
    )
}