import { Link } from "react-router-dom"
import { useAuthContext } from "../../services/AuthProvider";
import useLogout from "../../hooks/useLogout";

export default function Home() {
  const session = useAuthContext().auth;
  const logout = useLogout();

  return (
    <main
      className={`flex h-screen flex-col items-center justify-center p-24`}
    >
      <h1 className='text-3xl mb-72'>Home Page</h1>
      <p>
        Hello <span className='text-sky-500'>{session.user}</span>
      </p>
      <Link className='text-xl' to={"/admin"} >Admin</Link>
      <Link className='text-xl' to={"/notes"} >Notes</Link>
      <div>
        {
          session.isAuthenticated ? (
            <button onClick={() => {
              logout();
            }}>Logout</button>

          ):(
            <button onClick={() => {
              // signIn()
            }}>Login</button>
          )
        }
      </div>
    </main>
  )
}
