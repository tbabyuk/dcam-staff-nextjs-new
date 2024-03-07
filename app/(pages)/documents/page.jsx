"use client"

import DocLink from "@/app/components/DocLink"
import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"



const DocsPage = () => {

    const {data: session} = useSession()

    const [docsArray, setDocsArray] = useState([])
    const [message, setMessage] = useState("")


    console.log("Logging docsArray:", docsArray)

    
    useEffect(() => {

      const getDocs = async () => {

        try {
          const res = await fetch("/api/get-docs", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({teacher: session?.user.name.toLowerCase()})
          })

          const {t4a_docs} = await res.json()

          console.log("logging t4a_docs from DocsPage", t4a_docs)

          if(t4a_docs) {
            setDocsArray(t4a_docs)
          } else {
            setMessage("No docs available yet!")
          }

        } catch (error) {
            console.log("Error fetching docs:", error)
        }
      }

      getDocs()

    }, [session])
  
    return (
      <div className="page-container">

        {docsArray && (
          <div className="flex flex-col gap-8 text-center sm:text-left">
            {docsArray.map((doc) => (
              <DocLink doc={doc} />
            ))}
          </div>
        )}
        {message && (<p>{message}</p>)}

      </div>
    )
  }
  
  export default DocsPage