
import React from 'react'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'

const LatestJobCards = ({job}) => {
  const navigate = useNavigate();
  return (
    <div onClick={()=>navigate(`/description/${job._id}`)} className='p-5 rounded-md shadow-xl bg-white border border-gray-100 cursor-pointer'>
        <div>
            <h1 className='font-medium text-lg'>{job?.company?.name}</h1>
            <p className='text-sm text-gray-500'>India</p>
        </div>
        <div>
            <h1 className='font-bold text-lg my-2'>{job?.title}</h1>
            <p className='text-sm text-gray-600'>{job?.description}</p>
        </div>
        <div className='flex flex-center gap-2 mt-4'>
            <Badge className={'text-[#0F67B1] font-bold'} variant='ghost'>{job?.position} positions</Badge>
            <Badge className={'text-[#D91656] font-bold'} variant='ghost'> {job?.jobType}</Badge>
            <Badge className={'text-[#7209b7] font-bold'} variant='ghost'> {job?.salary}LPA</Badge>
        </div>

    </div>
  )
}

export default LatestJobCards