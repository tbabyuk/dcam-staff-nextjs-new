

import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { LoginForm } from './components/LoginForm'


const Home = async () =>  {

  const session = await getServerSession()

  console.log("loggin session from home page server component:", session)

  if(session) {
    redirect("/welcome")
  }


  return (
    <main className="flex h-screen">
      <div className="w-full md:w-1/2 bg-[url('/home_bg_left.jpg')] bg-cover grid place-items-center">
          {/* <Link href="/api/auth/signin?callbackUrl=/welcome" className="sign-in-btn">SIGN IN</Link> */}
          <img src="dcam-logo-white-long.png" width={200} className="absolute top-12" />
          <LoginForm />
      </div>
      <div className="hidden md:block w-1/2 bg-[url('/home_bg_right.jpg')] bg-cover" />
    </main>
  )
}

export default Home
