import { auth } from "@/auth"



const MemberPage = async () => {
  
  const session = await auth()

  console.log("logging auth session from member page:", session)

  return (
    <>
    {!session || !session.user ? (<div>Please sign in</div>) : (<div>Welcome!</div>)}
    </>
  )
}

export default MemberPage