import React from 'react'

const Sidebar = () => {
  return (
    <>
    <div className=''>
        <h1 className='font-semibold'>Books</h1>
        <ul className='flex flex-col px-4 py-2'>
            <li>Sacred writings</li>
            <li>History</li>
            <li>Comming Soon</li>
            <li>New Arrivals</li>
            <li>Children and Youth</li>
            <li>Devotions</li>
            <li>Introductory Books</li>
        </ul>
        <h1 className='font-semibold'>Book format</h1>
        <ul className='flex flex-col px-4 py-2'>
            <li><input type="checkbox" /> Ebook</li>
            <li><input type="checkbox" /> Hard copy</li>
            <li><input type="checkbox" /> both</li>
        </ul>
        <h1 className='font-semibold'>Book Language</h1>
        <ul className='flex flex-col px-4 py-2'>
            <li><input type="checkbox" /> English</li>
            <li><input type="checkbox" /> Urdu</li>
        </ul>
    </div>
    </>
  )
}

export default Sidebar