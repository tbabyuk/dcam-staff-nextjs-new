"use client"

import ReactPlayer from "react-player"
import { useState, useEffect } from "react"
import { BsCheckCircleFill, BsXCircleFill } from "react-icons/bs"
import { useSession } from "next-auth/react"


const TrainingPage = () => {

  const {data: session} = useSession()
  const [isClient, setIsClient] = useState(false)
  const [trainingVideosStatus, setTrainingVideosStatus] = useState({})


  console.log("logging trainingVideosStatus state", trainingVideosStatus)


  const handleVideoEnd = async (watchedVideo) => {
    // update mongoDB with the video that was just watched
    try {
      const res = await fetch("/api/training", {
          method: "POST",
          headers: {
              "Content-Type": "application/json"
          },
          body: JSON.stringify({teacher: session?.user.name.toLowerCase(), watchedVideo})
      })
      const {message} = await res.json()

      if(message === "success") {
          setTrainingVideosStatus((prev) => ({...prev, [watchedVideo]: true}))
      }

      } catch (error) {
          console.log("Error with post request:", error)
          setTrainingVideosStatus((prev) => ({...prev, [watchedVideo]: false}))
      }
  }

  const getTrainingVideosStatus = async () => {
    console.log("GetTrainingVideosFIRED")
    console.log("Current teacher is:", session?.user.name.toLowerCase())
    try {
      const res = await fetch("/api/training-videos-status", {
          method: "POST",
          headers: {
              "Content-Type": "application/json"
          },
          body: JSON.stringify({teacher: session?.user.name.toLowerCase()})
      })
      const {trainingVideos} = await res.json()

      setTrainingVideosStatus(trainingVideos)
      console.log("Logging trainingVidoes from front End:", trainingVideos)


      } catch (error) {
          console.log("Error with post request:", error)
      }
  }

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (session?.user?.name) {
      getTrainingVideosStatus()
    }
  }, [session]);


if (!isClient) return null;

  return (
    <>
      <div className="p-5 md:p-8 leading-8 text-center text-[0.9rem] bg-gray-200 text-gray-700 flex flex-col justify-center items-center">
          <h2>Dear teachers, here you will find training videos on the various topics you will need to know to be effective and knowledgeable as a teacher. Most of the videos are mandatory and you might be given a quiz that you will need to successfully pass based on these videos (more on this later).</h2>
      </div>
      <div className="p-5 md:p-10 flex flex-wrap gap-8 justify-evenly items-center">
          <div className="w-full sm:w-[400px] rounded-xl overflow-hidden">
                <div className="flex justify-between items-center mb-2">
                    <h3 className="text-2xl font-medium text-center">Logging Your Hours</h3>
                    {!trainingVideosStatus?.loggingHours && (<div className="flex text-red-500"><span>unwatched</span><BsXCircleFill size="1.4rem" className="ms-2" /></div>)}
                    {trainingVideosStatus?.loggingHours && (<div className="flex text-green-500"><span>watched</span><BsCheckCircleFill size="1.4rem" className="ms-2" /></div>)}
                </div>
                <ReactPlayer
                    className=""
                    url="https://firebasestorage.googleapis.com/v0/b/dcam-staff.appspot.com/o/videos%2Fstaff_tutorials%2Flogging_your_hours_final.mp4?alt=media&token=5ed54171-2704-4bd6-a450-0601bb993b32"
                    width="100%"
                    height="100%"
                    onEnded={() => handleVideoEnd("loggingHours")}
                    controls
                />
          </div>                
        </div>
    </>
  )
}

export default TrainingPage