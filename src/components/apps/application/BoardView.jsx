import React from 'react'
import ApplicationCard from './ApplicationCard'
const BoardView = ({ applications }) => {
 return (
  <div className='w-full py-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 2xl:gap-10'>
   {applications.map((application, index) =>
    (<ApplicationCard key={index} application={application} />)
   )}
  </div>
 )
}

export default BoardView