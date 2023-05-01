import { Inter } from 'next/font/google'
import { useSession, signIn, signOut } from "next-auth/react"
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const { data: session } = useSession()

  return (
    <main
      className={`flex h-screen flex-col items-center justify-center p-24 ${inter.className}`}
    >
      Hello {session && session.user.name}
      <Link className='text-xl' href={"/admin"} >Admin</Link>
      <Link className='text-xl' href={"/notes"} >Notes</Link>
      <div>
        {
          session ? (
            <button onClick={() => {
              signOut()
            }}>Logout</button>

          ):(
            <button onClick={() => {
              signIn()
            }}>Login</button>
          )
        }
      </div>
    </main>
  )
}
