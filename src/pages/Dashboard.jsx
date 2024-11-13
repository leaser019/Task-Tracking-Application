import React from 'react'
import { summary } from '../assets/data'
import Application from './Application'

const Dashboard = () => {
  const data = summary
  //   const stats = [
  //     {
  //       _id: '1',
  //       label: 'Total Applications',
  //       total: data?.totalTask || 0,
  //       icon:
  //     },
  //   ]
  return (
    <>
      <div className="w-full py-4">
        <div className="grid grid-cols-4 grid-rows-1 gap-4"></div>
      </div>
    </>
  )
}

export default Dashboard
