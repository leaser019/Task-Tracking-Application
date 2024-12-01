import React from 'react'
import ApplicationCard from './ApplicationCard'
import Loading from '../../common/Loading'

const BoardView = ({ applications, refetch }) => {
  if (!applications || applications.length === 0) {
    return (
      <div className="flex h-screen justify-center items-center">
        <Loading />
      </div>
    )
  }
  return (
    <div className="w-full py-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 2xl:gap-10">
      {applications.map((application, index) => (
        <ApplicationCard
          key={index}
          application={application}
          refetch={refetch}
        />
      ))}
    </div>
  )
}

export default BoardView
