import Image from 'next/image'
import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import Link from 'next/link'


const Home = async () =>  {

  const session = await auth()

  if(session?.user) {
    redirect("/welcome")
  }


  return (
    <main className="flex h-screen">
      <div className="w-full md:w-1/2 bg-blue-400 bg-[url('/home_bg_left.jpg')] bg-cover grid place-items-center">
          <Link href="/api/auth/signin?callbackUrl=/welcome" className="sign-in-btn">SIGN IN</Link>
      </div>
      <div className="hidden md:block bg-green-400 w-1/2 bg-[url('/home_bg_right.jpg')] bg-cover" />
    </main>
  )
}

export default Home
