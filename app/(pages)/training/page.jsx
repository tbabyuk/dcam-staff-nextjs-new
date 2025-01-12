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
          <div className="w-[90%] sm:w-[200px] rounded-xl overflow-hidden">
              <ReactPlayer
                  className=""
                  url="https://firebasestorage.googleapis.com/v0/b/dcam-website.appspot.com/o/videos%2Ftestimonials%2Fmonica_testimonial.mp4?alt=media&token=79da6e67-281c-4d96-9b74-a2be4571c560"
                  width="100%"
                  height="100%"
                  controls
              />
          </div>                
          <div className="w-[90%] sm:w-[450px] rounded-xl overflow-hidden">
              <ReactPlayer
                  className="react-player"
                  url="https://firebasestorage.googleapis.com/v0/b/dcam-website.appspot.com/o/videos%2Ftestimonials%2Fanusha_testimonial.mp4?alt=media&token=75adeec2-6515-423e-a3dc-40cf0da2155c"
                  width="100%"
                  height="100%"
                  controls
              />
          </div>                
          <div className="w-[90%] sm:w-[200px] rounded-xl overflow-hidden">
              <ReactPlayer
                  className="react-player"
                  url="https://firebasestorage.googleapis.com/v0/b/dcam-website.appspot.com/o/videos%2Ftestimonials%2Flenka_testimonial.mp4?alt=media&token=c900cd48-4650-4ebe-ba2e-645a1cab6bb2"
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