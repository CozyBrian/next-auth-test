import { Inter } from 'next/font/google'
import { useSession } from "next-auth/react"
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const { data: session } = useSession()

  return (
    <main
      className={`flex h-screen flex-col items-center justify-center p-24 text-5xl ${inter.className}`}
    >
      <h1 className='text-3xl'>Admin Page</h1>
      <Link className='text-xl' href={"/"} >Home</Link>
      <p>
        Hello <span className='text-sky-500'>{session && session.user?.name}</span>
      </p>
    </main>
  )
}
