import React from 'react'
import { FcGoogle } from 'react-icons/fc'
import { FaFacebookSquare } from 'react-icons/fa'

const SignInExtra = () => {
  return (
    <>
        <div className='w-full mt-[25px] border-b-[1px] border-gray-950 border-solid z-10'></div>
        <div className='px-[20px] py-[1px] w-max mx-[auto] -mt-[15px] z-50 bg-white'>Or</div>
        <div className='bg-white py-[10px] border-[1px] border-slate-300 rounded-md text-center my-[10px] cursor-pointer'> <FcGoogle className="inline"/> Sign in with Google </div>
        <div className='bg-white py-[10px] border-[1px] border-slate-300 rounded-md text-center cursor-pointer'> <FaFacebookSquare className="inline text-blue-950"/> Sign in with Facebook</div>
    </>
  )
}

export default SignInExtra