import { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuthContext } from '../../services/AuthProvider';
import axios from '../../lib/axios';
import { AxiosError } from 'axios';

interface formInput {
  username: string
  email: string
  password: string
}

function Login() {
  const { setAuth, persist, setPersist } = useAuthContext();
  const [islogin, setIslogin] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const {
    register,
    handleSubmit,
    // formState: { errors }
  } = useForm<formInput>();

  const onSubmit: SubmitHandler<formInput> = async (login) => {
    setError(null);
    try {
      const { data } = await axios.post('/auth/login', login);
      const accessToken = data.accessToken;
      const user = data.name;
      setAuth({ isAuthenticated: true, accessToken, user });
      console.log(data);
      navigate(from, { replace: true });

    } catch (err) {
      const error = err as AxiosError;
      console.log(error);  
      if (!error?.response) {
        setError('No Server Response');
      } else if (error.response?.status === 400) {
        setError ("Missing Username or Password");
      } else if (error.response?.status === 401) {
        setError('Unauthorized');
      } else {
        setError('Login Failed');
      }
    }
  };


  useEffect(() => {
    localStorage.setItem('persist', JSON.stringify(persist));
  }, [persist])
  

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
            autoComplete='email'
            placeholder='Email'
            {...register("email", { required: true })}
          />
          <input
            className='w-3/4 h-12 px-4 mt-8 text-xl border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500'
            type='password'
            autoComplete='password'
            placeholder='Password'
            {...register("password", { required: true })}
          />
          <div className='flex flex-row w-3/4 items-center m-2'>
            <input
              id='persist'
              type='checkbox'
              className='w-4 h-4 text-blue-500 bg-gray-100 border-gray-300 rounded outline-none'
              checked={persist}
              onChange={() => setPersist(prev => !prev)}
            />
            <label htmlFor='persist' className='ml-2'>Keep me logged in</label>
          </div>
          <button
            className='w-3/4 h-12 text-xl text-white bg-blue-500 rounded-lg'
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
        {error && <p className='mt-4 text-red-500'>{error}</p>}
      </div>
    </div>
  )
}

export default Login