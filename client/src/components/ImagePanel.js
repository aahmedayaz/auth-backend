import React from 'react'
import Lottie from 'lottie-react'
import animationData1 from '../images/left-panel.json'
import animationData2 from '../images/right-panel.json'

const ImagePanel = ({color , svgSide}) => {
  return (
    <>
        <div className={`w-[50%] h-screen px-[50px] gap-[30px] text-4xl ${color} ${svgSide === 'left' ? 'flex flex-col items-center justify-center text-white' : 'text-black'}`}>
            <Lottie className={`${svgSide === 'left' ? 'w-[400px]' : 'w-auto'}`} animationData={svgSide === "left" ? animationData2 : animationData1}/>
            <h1 className='font-mono'>{`${svgSide === 'left' ? 'Good Things takes time' : 'Read Minds by reading books'}`}</h1>
        </div>
    </>
  )
}

export default ImagePanel