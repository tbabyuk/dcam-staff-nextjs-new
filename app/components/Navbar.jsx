



export const Navbar = () => {

    return (
      <nav className="px-4 h-[53px] bg-[#375681] text-gray-100 flex justify-between items-center border-b-2 border-gray-200">
        <img src="/dcam-logo-white-long.png" className="h-[30px]" />
        <div className="flex gap-4">
          <span className="flex items-center">Hello, teacher</span>
          <img src="/avatar1.jpg" className="h-[34px] rounded-full" />
        </div>
      </nav>
    )
  }