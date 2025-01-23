"use client"

import ReactPlayer from "react-player"
import { useState, useEffect } from "react"
import { BsCheckCircleFill, BsXCircleFill } from "react-icons/bs"
import { useSession } from "next-auth/react"
import { PageHeader } from "@/app/components/PageHeader"


const TrainingPage = () => {

  const {data: session} = useSession()
  const [isClient, setIsClient] = useState(false)
  const [trainingVideosStatus, setTrainingVideosStatus] = useState({})
  const [trainingVideosArray, setTrainingVideosArray] = useState([])


  console.log("logging trainingVideosArray state", trainingVideosArray)


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

  const getTrainingVideos = async () => {
    console.log("Logging user data from getTrainingVideos:", session?.user.name.toLowerCase())

    try {
      const res = await fetch("/api/get-training-videos", {
          method: "POST",
          headers: {
              "Content-Type": "application/json"
          },
          body: JSON.stringify({teacher: session?.user.name.toLowerCase(), instrument: "all"})
      })
      const {videoList} = await res.json()

      // setTrainingVideosStatus(trainingVideos)
      console.log("Logging response from API inside front end:", videoList)
      setTrainingVideosArray([...videoList])
      getTrainingVideosStatus()

      } catch (error) {
          console.log("Error with post request:", error)
      }


  }

  useEffect(() => {
    setIsClient(true);
  }, []);


  // fetch relevant training videos based on teacher's instrument
  useEffect(() => {
    if (session?.user?.name) {
      getTrainingVideos()
    }
  }, [session])


if (!isClient) return null;

  return (
    <>
      <PageHeader>
          <h2>Dear teachers, here you will find training videos on the various topics you will need to know to be effective and knowledgeable as a teacher. Most of the videos are mandatory and you might be given a quiz that you will need to successfully pass based on these videos (more on this later).</h2>
      </PageHeader>
      <div className="p-5 md:p-10 flex flex-wrap gap-6 justify-evenly items-center">
            {trainingVideosArray && trainingVideosArray.map((video) => (
                <div className="w-full sm:w-[400px] rounded-xl overflow-hidden">
                  <div className="flex justify-between items-center mb-2">
                      <h3 className="text-2xl font-medium text-center">{video.title}</h3>
                      {!trainingVideosStatus?.[video.shortTitle] && (<div className="flex text-red-500"><span>unwatched</span><BsXCircleFill size="1.4rem" className="ms-2" /></div>)}
                      {trainingVideosStatus?.[video.shortTitle] && (<div className="flex text-green-500"><span>watched</span><BsCheckCircleFill size="1.4rem" className="ms-2" /></div>)}
                  </div>
                  <ReactPlayer
                      className=""
                      url={video.url}
                      width="100%"
                      height="100%"
                      onEnded={() => handleVideoEnd(video.shortTitle)}
                      controls
                  />
                </div>               
              ))
            }
        </div>
    </>
  )
}

export default TrainingPage