import React from 'react'
import { IoIosApps } from 'react-icons/io'
import { TaskSquare } from 'iconsax-react'
import { FaFileCode, FaTrash } from 'react-icons/fa6'
import { TbBrandSpeedtest } from 'react-icons/tb'
import { MdCloudDone } from 'react-icons/md'
import Title from '../components/common/Title'
import BarChartVertical from '../components/apps/dashboard/BarChartVertical'
import {
  useGetPriorityAppQuery,
  useGetStatusQuery,
} from '../redux/slices/api/dashboardApiSlice'
import Loading from '../components/common/Loading'
import PieChartUsage from '../components/apps/dashboard/PieChartUsage'
import BarChartHorizon from '../components/apps/dashboard/BarChartHorizon'

const Dashboard = () => {
  const { data: priorityData } = useGetPriorityAppQuery()
  const { data: statusData, isLoading, error } = useGetStatusQuery()
  const data = statusData?.Statistic?.[0]
  const Card = React.memo(({ icon, label, bg, total }) => {
    return (
      <div
        className={`
        grid grid-cols-[auto_1fr] items-center gap-4 p-4
        rounded-lg shadow-md ${bg} text-white
        transition-transform duration-200 hover:scale-105
        border border-white/10
      `}
      >
        <div
          className="
          flex items-center justify-center
          w-12 h-12
          bg-white/20 rounded-lg
          transition-transform duration-200
          hover:scale-105
        "
        >
          <div className="text-xl">{icon}</div>
        </div>

        <div className="flex flex-col space-y-1">
          <h4
            className="
            text-xl font-bold
            transition-transform duration-200
          "
          >
            {total}
          </h4>
          <p
            className="
            text-sm font-medium text-white/80
            transition-transform duration-200
          "
          >
            {label}
          </p>
        </div>
      </div>
    )
  })
  const stats = [
    {
      id: '1',
      label: 'Total Applications',
      total: data?.total || 0,
      icon: <IoIosApps />,
      bg: 'bg-gradient-to-r from-blue-500 to-indigo-500',
    },
    {
      id: '2',
      label: 'To Do',
      total: data?.detail[0]?.count || 0,
      icon: <TaskSquare />,
      bg: 'bg-gradient-to-r from-red-500 to-pink-500',
    },
    {
      id: '3',
      label: 'Implement',
      total: data?.detail[1]?.count || 0,
      icon: <FaFileCode />,
      bg: 'bg-gradient-to-r from-yellow-500 to-orange-500',
    },
    {
      id: '4',
      label: 'QA/QC',
      total: data?.detail[2]?.count || 0,
      icon: <TbBrandSpeedtest />,
      bg: 'bg-gradient-to-r from-blue-500 to-cyan-500',
    },
    {
      id: '5',
      label: 'Production',
      total: data?.detail[3]?.count || 0,
      icon: <MdCloudDone />,
      bg: 'bg-gradient-to-r from-green-500 to-teal-500',
    },
    {
      id: '6',
      label: 'Trash',
      total: data?.trash || 0,
      icon: <FaTrash />,
      bg: 'bg-gradient-to-r from-red-500 to-purple-500',
    },
  ]

  if (isLoading) {
    return (
      <div className="w-full py-4">
        <Loading />.
      </div>
    )
  }

  if (error) {
    return (
      <div className="w-full py-4 text-red-500">Error: {error.message}</div>
    )
  }

  return (
    <div className="w-full py-4 flex flex-col items-center">
      <div className="flex items-center justify-between mb-4 w-[90%]">
        <Title title="Dashboard" />
      </div>

      <div className="grid grid-cols-3 grid-rows-2 gap-4 pb-10 w-[90%]">
        {stats.map((stat) => (
          <Card
            key={stat.id}
            icon={stat.icon}
            label={stat.label}
            bg={stat.bg}
            total={stat.total}
          />
        ))}
      </div>

      <div className="w-[90%] bg-white mt-10 p-4 rounded-xl shadow-md flex flex-col">
        <h1 className="pb-10 text-4xl text-center capitalize font-bold impressive-title">
          Chart
        </h1>
        <div className="flex flex-row items-center justify-center">
          <BarChartVertical data={priorityData} />
          <PieChartUsage
            data={[
              { name: 'To Do', value: 400 },
              { name: 'Implement', value: 300 },
              { name: 'QA/QC', value: 300 },
              { name: 'Production', value: 200 },
            ]}
          />
        </div>
        <BarChartHorizon
          data={[
            {
              name: 'John Doe',
              todo: 5,
              inProgress: 3,
              completed: 8,
            },
            {
              name: 'Jane Smith',
              todo: 2,
              inProgress: 4,
              completed: 6,
            },
          ]}
        />
      </div>
    </div>
  )
}

export default Dashboard
