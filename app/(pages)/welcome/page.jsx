import { auth } from "@/auth"


const WelcomePage = async () => {

  const session = await auth()


  return (
    <main className="page-container text-center">Welcome, {session?.user.name}! What would you like to do today?</main>
  )
}

export default WelcomePage