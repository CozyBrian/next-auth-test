import axios from 'axios';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import React, { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';

interface formInput {
  username: string
  email: string
  password: string
}

function Login() {
  const [islogin, setIslogin] = useState(true);
  const router = useRouter();
  const callbackUrl = decodeURI((router.query?.callbackUrl as string) ?? "/");

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<formInput>();

  const onSubmit: SubmitHandler<formInput> = async (data) => {
    try {
      const result = await signIn("credentials", {
        email: data.email,
        password: data.password,
        callbackUrl: callbackUrl ?? "/",
        redirect: false,
      });
      if (result?.ok) {
        router.push(callbackUrl);
      } 
    } catch (error) {
      console.log(error);  
    }
  };

  return (
    <div className='flex items-center justify-center h-screen'>
      <div className='flex flex-col items-center justify-center w-96 py-14 bg-white rounded-2xl shadow-xl'>
        <h1 className='text-4xl font-bold'>{islogin ?  "Login" : "Sign Up"}</h1>
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col items-center justify-center w-full'>
          {!islogin && <input
            className='w-3/4 h-12 px-4 mt-8 text-xl border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500'
            type='text'
            placeholder='Username'
            {...register("username", { required: true })}
          />}
          <input
            className='w-3/4 h-12 px-4 mt-8 text-xl border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500'
            type='email'
            placeholder='Email'
            {...register("email", { required: true })}
          />
          <input
            className='w-3/4 h-12 px-4 mt-8 text-xl border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500'
            type='password'
            placeholder='Password'
            {...register("password", { required: true })}
          />
          <button
            className='w-3/4 h-12 mt-8 text-xl text-white bg-blue-500 rounded-lg'
            type='submit'
          >
            {islogin ?  "Login" : "Sign Up"}
          </button>
        </form>
        <button 
        type='button'
          onClick={() => {
            setIslogin(!islogin);
          }} 
          className='mt-4'>
          {!islogin ?  "Login" : "Sign Up"}
        </button>
      </div>
    </div>
  )
}

export default Login