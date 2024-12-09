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
  useGetAppUserQuery,
} from '../redux/slices/api/dashboardApiSlice'
import Loading from '../components/common/Loading'
import PieChartUsage from '../components/apps/dashboard/PieChartUsage'
import BarChartHorizon from '../components/apps/dashboard/BarChartHorizon'
import SubTitle from '../components/common/SubTitle'
import Error from '../components/common/Error'
import { useDispatch } from 'react-redux'
import { setAllApplication } from '../redux/slices/applicationSlice'

const Dashboard = () => {
  const dispatch = useDispatch()
  const { data: priorityData } = useGetPriorityAppQuery()
  var priority_data = priorityData?.Statistic
  const { data: statusData, isLoading, error, refetch } = useGetStatusQuery()
  const { data: appUserData } = useGetAppUserQuery()
  console.log(appUserData)
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
      total: statusData?.untrashedStatistic?.[0]['total'] || 0,
      icon: <IoIosApps />,
      bg: 'bg-gradient-to-r from-blue-500 to-indigo-500',
    },
    {
      id: '2',
      label: 'To Do',
      total: statusData?.untrashedStatistic?.[0]['To Do'] || 0,
      icon: <TaskSquare />,
      bg: 'bg-gradient-to-r from-red-500 to-pink-500',
    },
    {
      id: '3',
      label: 'Implement',
      total: statusData?.untrashedStatistic?.[0]['Implement'] || 0,
      icon: <FaFileCode />,
      bg: 'bg-gradient-to-r from-yellow-500 to-orange-500',
    },
    {
      id: '4',
      label: 'QA/QC',
      total: statusData?.untrashedStatistic?.[0]['Testing'] || 0,
      icon: <TbBrandSpeedtest />,
      bg: 'bg-gradient-to-r from-blue-500 to-cyan-500',
    },
    {
      id: '5',
      label: 'Production',
      total: statusData?.untrashedStatistic?.[0]['Production'] || 0,
      icon: <MdCloudDone />,
      bg: 'bg-gradient-to-r from-green-500 to-teal-500',
    },
    {
      id: '6',
      label: 'Trash',
      total: statusData?.trashedStatistic?.[0]['total'] || 0,
      icon: <FaTrash />,
      bg: 'bg-gradient-to-r from-red-500 to-purple-500',
    },
  ]

  const statusDataArray = statusData?.untrashedStatistic?.[0]
    ? Object.entries(statusData.untrashedStatistic[0])
        .filter(([key]) => key !== 'total')
        .map(([key, value]) => ({
          status: key,
          count: value,
        }))
    : []

  React.useEffect(() => {
    if (statusData) {
      dispatch(setAllApplication(statusData))
      localStorage.setItem('statusData', JSON.stringify(statusData))
    }
  }, [statusData, dispatch])
  React.useEffect(() => {
    refetch()
  }, [refetch])
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loading />.
      </div>
    )
  }

  if (error) {
    return (
      <div>
        <Error />
      </div>
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
        <Title
          title="Informative Chart"
          className="pb-10 text-4xl text-center capitalize font-bold impressive-title"
        />
        <div className="flex flex-row items-center justify-center">
          <div className="flex flex-col">
            <SubTitle
              subtitle="Application Count By Priority Level"
              className="capitalize text-center"
            />
            <BarChartVertical data={priority_data} />
          </div>
          <div className="flex flex-col">
            <SubTitle
              subtitle="Application Count By Status"
              className="capitalize text-center"
            />
            <PieChartUsage data={statusDataArray} />
          </div>
        </div>
        <div className="flex flex-col mt-2">
          <SubTitle
            subtitle="Application Assigned Per Team Member"
            className="capitalize text-center"
          />
          <BarChartHorizon data={appUserData?.users} />
        </div>
      </div>
    </div>
  )
}

export default Dashboard
