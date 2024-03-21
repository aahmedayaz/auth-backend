import React from 'react'
import Login from './Login'
import SignUp from './SignUp'
import ImagePanel from './ImagePanel'

const LoginSignUpWrapper = ({type}) => {
  return (
    <>
        <div className="w-full h-screen flex">
            {/* Left Panel */}
            {type === 'Login' && <ImagePanel color={"bg-emerald-900"} svgSide={"left"} />}
            {/* Right Panel */}
            <div className="w-[50%] h-screen px-[100px] py-[50px] flex flex-col">
                {type === 'Login' ? <Login/> : <SignUp/>}
            </div>
            {type === 'Signup' && <ImagePanel color={"bg-yellow-300"} svgSide={"right"} />}
        </div>
    </>
  )
}

export default LoginSignUpWrapper