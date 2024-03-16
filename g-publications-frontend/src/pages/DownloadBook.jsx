import React, { useState } from 'react'
import Loader from '../components/Loader';

const DownloadBook = () => {

  const [loading,setLoading] = useState(false);

  const handleDownload = ()=>{
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 2000);
  }
  return (
    <>
    {loading? <Loader/>: 
    <div className='p-4 flex items-center flex-col justify-center gap-4'>
    <div className='font-bold text-xl'>DownloadBook</div>
    <a onClick={handleDownload} className='px-2 py-1 bg-yellow-500 rounded-lg hover:bg-yellow-400 cursor-pointer' href='#'>Download</a>
    </div>
    }
    </>
  )
}

export default DownloadBook