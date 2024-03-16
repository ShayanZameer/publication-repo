import React, { useEffect } from 'react'
import cross from "../assets/xmark-solid.svg"

const BookPreview = ({firstBook, secondBook, thirdBook, forthBook, fifthBook, handleshowBookpreview}) => {
    useEffect(() => {
    //   console.log(coversarr)
    }, [])
    
  return (
    <div className='bg-black bg-opacity-30'>
        <img src={cross} alt="" className='w-12 text-5xl' onClick={handleshowBookpreview}/>
        <p className={`${(firstBook&& secondBook&& thirdBook&& forthBook&& fifthBook) == undefined ?"text-3xl flex justify-center":"hidden"}`} >No, preview avaliable</p>
    <div className='flex flex-col items-center justify-center p-16 '>
        <img className='p-4' src={firstBook} alt="" width={400} />
        <img className='p-4' src={secondBook} alt="" width={400} />
        <img className='p-4' src={thirdBook} alt="" width={400} />
        <img className='p-4' src={forthBook} alt="" width={400} />
        <img className='p-4' src={fifthBook} alt="" width={400} />
    </div>
    </div>
  )
}

export default BookPreview