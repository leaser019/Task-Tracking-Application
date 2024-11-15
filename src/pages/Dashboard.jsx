import React from 'react'
import { summary } from '../assets/data'
import { IoIosApps } from 'react-icons/io'
import { TaskSquare } from 'iconsax-react'
import { FaFileCode } from 'react-icons/fa6'
import { TbBrandSpeedtest } from 'react-icons/tb'
import { MdCloudDone } from 'react-icons/md'
import { FaTrash } from 'react-icons/fa'
import Title from '../components/common/Title'
import Chart from '../components/apps/dashboard/Chart'

const Dashboard = () => {
  const Card = React.memo(({ icon, label, bg, total }) => {
    return (
      <div
        className={`
  grid grid-cols-[auto_1fr] items-center gap-6 p-5
  rounded-xl shadow-lg ${bg} text-white
  transition-all duration-300 hover:scale-[1.02]
  backdrop-blur-sm bg-opacity-90
  border border-white/10
`}
      >
        {/* Icon Column - Left */}
        <div
          className="
    flex items-center justify-center
    w-14 h-14
    bg-white/15 rounded-xl
    backdrop-blur-sm
    transition-transform duration-300
    hover:rotate-6 hover:scale-110
  "
        >
          <div className="text-2xl">{icon}</div>
        </div>

        {/* Information Column - Right */}
        <div className="flex flex-col space-y-2">
          <h4
            className="
      text-2xl font-bold tracking-tight
      transition-all duration-300
      group-hover:translate-x-1
    "
          >
            {total}
          </h4>
          <p
            className="
      text-sm font-medium text-white/80
      transition-all duration-300
      group-hover:translate-x-1
    "
          >
            {label}
          </p>
        </div>
      </div>
    )
  })

  const data = summary
  const stats = [
    {
      _id: '1',
      label: 'Total Applications',
      total: data?.totalTask || 0,
      icon: <IoIosApps />,
      bg: 'bg-gradient-to-r from-blue-500 to-indigo-500',
    },
    {
      _id: '2',
      label: 'To Do',
      total: data?.totalTask || 0,
      icon: <TaskSquare />,
      bg: 'bg-gradient-to-r from-red-500 to-pink-500',
    },
    {
      _id: '3',
      label: 'Implement',
      total: data?.totalTask || 0,
      icon: <FaFileCode />,
      bg: 'bg-gradient-to-r from-yellow-500 to-orange-500',
    },
    {
      _id: '4',
      label: 'QA/QC',
      total: data?.totalTask || 0,
      icon: <TbBrandSpeedtest />,
      bg: 'bg-gradient-to-r from-blue-500 to-cyan-500',
    },
    {
      _id: '5',
      label: 'Production',
      total: data?.totalTask || 0,
      icon: <MdCloudDone />,
      bg: 'bg-gradient-to-r from-green-500 to-teal-500',
    },
    {
      _id: '6',
      label: 'Trash',
      total: data?.totalTask || 0,
      icon: <FaTrash />,
      bg: 'bg-gradient-to-r from-red-500 to-purple-500',
    },
  ]
  return (
    <>
      <div className="w-full py-4">
        <div className="flex items-center justify-between mb-4">
          <Title title={' Dashboard'} />
        </div>
        {/** Total data visualize */}
        <div className="grid grid-cols-3 grid-rows-2 gap-4 pb-10">
          {stats.map(({ icon, label, bg, total }) => (
            <Card key={label} icon={icon} label={label} bg={bg} total={total} />
          ))}
        </div>
        <div className="w-[90%] bg-white mt-10 ml-14 p-4 rounded-xl shadow-md flex flex-col">
          <h1 className="pb-10 text-4xl text-center capitalize font-bold impressive-title">
            Chart
          </h1>
          <Chart />
        </div>
      </div>
    </>
  )
}

export default Dashboard
