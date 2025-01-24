"use client"

import { createContext, useContext, useState, useEffect } from "react";
import { useSession } from "next-auth/react";


const TrainingVideosContext = createContext()


export const TrainingVideosStatusProvider = ({children}) => {

    // const [videosStatus, setVideosStatus] = useState({})

    const [assignedTrainingVideos, setAssignedTrainingVideos] = useState([])
    const [teacherTrainingVideosData, setTeacherTrainingVideosData] = useState([])
    const {data: session} = useSession()



    const getTeacherTrainingVideosData = async () => {
        try {
          const res = await fetch("/api/training-videos-status", {
              method: "POST",
              headers: {
                  "Content-Type": "application/json"
              },
              body: JSON.stringify({teacher: session?.user.name.toLowerCase()})
          })
          const {trainingVideosData} = await res.json()

          console.log("Logging trainingVideosData from TrainingVideosContext))))))))):", trainingVideosData)

          setTeacherTrainingVideosData(trainingVideosData)
    
          } catch (error) {
              console.log("Error with post request:", error)
          }
      }


    const getAssignedTrainingVideos = async () => {
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
        console.log("Logging response from TrainingVideosContext--------------------:", videoList)
        // setTrainingVideosArray([...videoList])
        // getTrainingVideosStatus()
        setAssignedTrainingVideos(videoList)
    
        } catch (error) {
            console.log("Error with post request:", error)
        }
    }


    useEffect(() => {
        console.log("useEFFECT inside TtrainingVideosContext FIREDDDDDDDDDDDDDDDDDDDDDDDDDDDDD")
        // getTrainingVideosStatus()
        getAssignedTrainingVideos()
    }, [session])


    useEffect(() => {
        getTeacherTrainingVideosData()
    }, [assignedTrainingVideos])

    return(
        <TrainingVideosContext.Provider value={{assignedTrainingVideos, teacherTrainingVideosData, setTeacherTrainingVideosData}}>
            {children}
        </TrainingVideosContext.Provider>
    )
}


export const useTrainingVideosData = () => useContext(TrainingVideosContext)