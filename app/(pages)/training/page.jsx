"use client"

import ReactPlayer from "react-player"
import { useState, useEffect } from "react"


const TrainingPage = () => {

  const [isClient, setIsClient] = useState(false)


  useEffect(() => {
    setIsClient(true);
}, []);


if (!isClient) return null;

  return (
    <>
      <div className="p-5 md:p-8 leading-8 text-center text-[0.9rem] bg-gray-200 text-gray-700 flex flex-col justify-center items-center">
          <h2>Dear teachers, here you will find training videos on the various topics you will need to know to be effective and knowledgeable as a teacher. Most of the videos are mandatory and you might be given a quiz that you will need to successfully pass based on these videos (more on this later).</h2>
      </div>
      <div className="p-5 md:p-10 flex flex-wrap gap-8 justify-evenly items-center">
          <div className="w-full sm:w-[400px] rounded-xl overflow-hidden">
                <h3 className="text-2xl font-medium text-center mb-2">Logging Your Hours</h3>
                <ReactPlayer
                    className=""
                    url="https://firebasestorage.googleapis.com/v0/b/dcam-staff.appspot.com/o/videos%2Fstaff_tutorials%2Flogging_your_hours_final.mp4?alt=media&token=5ed54171-2704-4bd6-a450-0601bb993b32"
                    width="100%"
                    height="100%"
                    controls
                />
          </div>                
        </div>
    </>
  )
}

export default TrainingPage