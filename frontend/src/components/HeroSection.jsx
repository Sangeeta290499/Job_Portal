import React, { useState } from 'react'
import { Button } from './ui/button'
import { Search } from 'lucide-react'
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = () => {
      dispatch(setSearchedQuery(query));
      navigate("/browse");
  }

  return (
    <div className='text-center'>
        <div className='flex flex-col gap-5 my-10'>
            <span className=' mx-auto px-4 py-2 rounded-full bg-gray-100 text-[#0F67B1] font-medium'>No. 1 Job Hunt Website</span>
            <h1 className='text-5xl font-bold'>Search, Apply & <br /> Get Your <span className='text-[#3FA2F6]'>Dream Jobs</span></h1>

            <p className='flex items-center justify-center text-center mx-auto max-w-2xl text-sm'>Whether you’re starting your career, making a transition, or expanding your team, [HireIndia] is designed to make job searching and hiring a smoother, faster, and more rewarding experience. Join us and start connecting with opportunity today!
            </p>
            <div className='flex w-[40%] shadow-lg border border-gray-200 pl-3 rounded-full items-center gap-4 mx-auto'>
                <input 
                type="text"
                placeholder='Find your dream jobs'
                onChange={(e) => setQuery(e.target.value)}
                className='outline-none border-none w-full' 
                />
                <Button onClick={searchJobHandler} className='rounded-r-full bg-[#0F67B1]'>
                    <Search className='h-5 w-5'/>
                </Button>
            </div>

        </div>
    </div>
  )
}

export default HeroSection