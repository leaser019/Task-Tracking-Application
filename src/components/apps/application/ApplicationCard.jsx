import React from 'react'
import { useSelector } from 'react-redux'
import clsx from 'clsx'
import { Message, AttachSquare, Chart2 } from 'iconsax-react'
import {
  formatDate,
  PRIORITY_STYLES,
  TASK_TYPE,
  BGS,
  ICONS,
} from '../../../utils'
import ApplicationDialog from './applicationDetail/ApplicationDialog'
import UserInfo from './UserInfo'

const ApplicationCard = ({ application }) => {
  const { user } = useSelector((state) => state.authentication)
  const [open, setOpen] = React.useState(false)

  const CardHeader = () => (
    <div className="flex justify-between items-center mb-4 group">
      <div
        className={clsx(
          'flex items-center gap-2 px-3 py-1 rounded-full transition-all duration-200',
          'hover:bg-opacity-10 cursor-pointer',
          PRIORITY_STYLES[application?.priority]
        )}
      >
        <span className="text-xl group-hover:scale-110 transition-transform">
          {ICONS[application?.priority]}
        </span>
        <span className="uppercase text-sm font-semibold group-hover:tracking-wider transition-all">
          {application?.priority} Priority
        </span>
      </div>
      {user?.isAdmin && (
        <div className="relative z-[100]">
          <ApplicationDialog application={application} />
        </div>
      )}
    </div>
  )

  const TaskTitle = () => (
    <div className="flex items-center gap-3 mb-2 group cursor-pointer hover:bg-gray-50 p-2 rounded-md transition-all">
      <div
        className={clsx(
          'w-3 h-3 rounded-full group-hover:scale-110 transition-transform',
          TASK_TYPE[application.stage]
        )}
      />
      <h3 className="text-lg font-medium line-clamp-1 group-hover:line-clamp-none">
        {application?.title}
      </h3>
    </div>
  )

  const StatItem = ({ icon, count, label }) => (
    <div
      className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors cursor-pointer group"
      title={label}
    >
      <div className="group-hover:scale-110 transition-transform">{icon}</div>
      <span className="text-sm group-hover:font-medium">{count}</span>
    </div>
  )

  const Statistics = () => (
    <div className="flex items-center justify-between py-4">
      <div className="flex items-center gap-6">
        <StatItem
          icon={<Message size="20" />}
          count={application?.activities?.length}
          label="Activities"
        />
        <StatItem
          icon={<AttachSquare size="20" />}
          count={application?.assets?.length}
          label="Assets"
        />
        <StatItem
          icon={<Chart2 size="20" />}
          count={`0/${application?.subTasks?.length}`}
          label="Sub Tasks Progress"
        />
      </div>
      <TeamMembers team={application?.team} className="z-5" />
    </div>
  )

  const TeamMembers = ({ team }) => (
    <div className="relative flex flex-row-reverse" style={{ zIndex: 1 }}>
      {team?.map((member, index) => (
        <div
          key={index}
          className={clsx(
            // Base styles
            'w-8 h-8 rounded-full -ml-2',
            'border-2 border-white',
            'flex items-center justify-center',
            // Hover effects
            'transform transition-all duration-200',
            'hover:scale-110 hover:border-blue-200',
            'hover:shadow-lg hover:z-[2]',
            // Text styles
            'text-white text-sm font-medium',
            // Background color
            BGS[index % BGS?.length]
          )}
        >
          <div className="relative group">
            <UserInfo user={member} />
            {/* Tooltip */}
            <div
              className="absolute -top-10 left-1/2 -translate-x-1/2
                        opacity-0 group-hover:opacity-100
                        transition-opacity duration-200
                        pointer-events-none"
            >
              <span
                className="px-2 py-1 text-xs text-white bg-gray-800
                         rounded-md whitespace-nowrap"
              >
                {member.name}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  )

  const SubTaskSection = () => (
    <div className="border-t border-gray-100 pt-4 hover:bg-gray-50 transition-colors rounded-md p-2">
      {application?.subTasks?.length > 0 ? (
        <div className="space-y-3 cursor-pointer">
          <h4 className="font-medium text-gray-900 hover:text-blue-600 transition-colors">
            {application?.subTasks[0].title}
          </h4>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-500 hover:text-gray-700 transition-colors">
              {formatDate(new Date(application?.subTasks[0]?.date))}
            </span>
            <span
              className="px-3 py-1 text-sm bg-blue-50 text-blue-600 rounded-full
                           hover:bg-blue-100 hover:text-blue-700 transition-colors"
            >
              {application?.subTasks[0].tag}
            </span>
          </div>
        </div>
      ) : (
        <p className="text-gray-500 text-sm hover:text-gray-700 transition-colors">
          No Sub Task
        </p>
      )}
    </div>
  )

  return (
    <div
      className="bg-white rounded-lg shadow-sm hover:shadow-xl transform hover:-translate-y-1
                    transition-all duration-300 p-5"
    >
      <CardHeader />
      <TaskTitle />
      <span className="text-sm text-gray-500 hover:text-gray-700 transition-colors">
        {formatDate(new Date(application?.date))}
      </span>
      <Statistics />
      <SubTaskSection />
      <button
        onClick={() => setOpen(true)}
        disabled={!user.isAdmin}
        className="w-full mt-4 py-2 text-sm font-medium text-gray-600
                   hover:bg-gray-50 hover:text-gray-800 active:bg-gray-100
                   disabled:text-gray-300 disabled:cursor-not-allowed
                   transition-all duration-200 rounded-md"
      >
        ADD SUBTASK
      </button>
    </div>
  )
}

export default ApplicationCard
