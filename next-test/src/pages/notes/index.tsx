import useAxiosAuth from '@/lib/hooks/useAxiosAuth'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

function Notes() {
  const axiosAuth = useAxiosAuth();
  const [notes, setNotes] = useState<{
    id: number;
    title: string;
    description: string;
  }[]>([])

  const getnotes = async () => {
    try {
      const res = await axiosAuth.get('/notes')
      setNotes(res.data)
    } catch (error) {
      console.log(error)
    }
  }

  // useEffect(() => {
  //   axiosAuth.get('/notes').then((res) => {
  //     setNotes(res.data)
  //   }).catch((err) => {
  //     console.log(err)
  //   });
  // }, [axiosAuth])
  
  return (
    <div className='flex flex-col items-center justify-center h-screen gap-4'>
      <h1 className='text-5xl text-sky-500'>
        Notes
      </h1>
      {notes.map((note, index) => {
        return (
          <div key={index} className='w-[280px] h-[140px] bg-slate-200 shadow-md p-2 rounded-md'>
            <p className='text-2xl'>{note.title}</p>
            <p>{note.description}</p>
          </div>
        )
      })}
      <button onClick={getnotes} className='p-2 bg-blue-500 text-white rounded-md'>Get Notes</button>
      <Link className='text-xl' href={"/"} >Home</Link>
    </div>
  )
}

export default Notes