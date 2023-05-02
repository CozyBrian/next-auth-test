import { Link } from 'react-router-dom';

function Admin() {
  return (
    <main
      className={`flex h-screen flex-col items-center justify-center p-24`}
    >
      <p className='text-4xl mb-72'>
        Hello <span className='text-sky-500'>Brian</span>
      </p>
      <Link className='text-xl' to={"/"} >Home</Link>
      <Link className='text-xl' to={"/notes"} >Notes</Link>
    </main>
  )
}

export default Admin;