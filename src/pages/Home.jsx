import React from 'react'
import { NavLink } from 'react-router-dom'

function Home() {
  return (
    <div className='flex flex-col items-center justify-center h-screen w-screen bg-pink-100 text-center'>
        <div> <h1 className='text-5xl font-bold text-pink-500'> ChillBuddy</h1></div>
        <div className='text-2xl text-gray-700 mt-4'>Your AI Companion for Relaxation</div>
        <div className='mt-8'>
           <NavLink to="/chatbot" className='bg-pink-500 text-white px-6 py-3 rounded-lg hover:bg-pink-600 transition duration-300'>
                    Get Started
           </NavLink>
        </div>

    </div>
  )
}

export default Home