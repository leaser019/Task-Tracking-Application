import React from 'react'
import { useSelector } from 'react-redux'
import clsx from 'clsx'
import { formatDate } from '../../../utils'
import { PRIORITY_STYLES } from '../../../utils'
import { TASK_TYPE } from '../../../utils'
import ApplicationDialog from './ApplicationDialog'
import { Message } from 'iconsax-react'
import { AttachSquare } from 'iconsax-react'
import { Chart2 } from 'iconsax-react'
import { BGS } from '../../../utils'
import UserInfo from './UserInfo'

const ApplicationCard = ({ application }) => {
  const ICONS = {
    high: '',
    medium: '',
    low: '',
  }

  const { user } = useSelector((state) => state.authentication)
  const [open, setOpen] = React.useState(false)

  return (
    <>
      <div className="w-full h-fit bg-white shadow-md p-4 rounded">
        <div className="w-full flex justify-between">
          <div
            className={clsx(
              'flex flex-1 gap-1 items-center text-sm font-medium ',
              PRIORITY_STYLES[application?.priority]
            )}
          >
            <span className="text-lg">{ICONS[application?.priority]}</span>
            <span className="uppercase">{application?.priority} Priority</span>
          </div>
          {/* {user?.isAdmin && <ApplicationDialog application={application} />} */}
          ...
        </div>

        <div className="flex items-center gap-2">
          <div
            className={clsx(
              'w-4 h-4 rounded-full',
              TASK_TYPE[application.stage]
            )}
          />
          <h4 className="line-clamp-1 text-black">{application?.title}</h4>
        </div>
        <span className="text-sm text-gray-600">
          {formatDate(new Date(application?.date))}
        </span>

        <div className="w-full border-t border-gray-200 my-2" />
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            <div className="flex gap-1 items-center text-sm text-gray-600">
              <Message size="20" color="#697689" />
              <span>{application?.activities?.length}</span>
            </div>
            <div className="flex gap-1 items-center text-sm text-gray-600 ">
              <AttachSquare size="20" color="#697689" />
              <span>{application?.assets?.length}</span>
            </div>
            <div className="flex gap-1 items-center text-sm text-gray-600 ">
              <Chart2 size="20" color="#697689" />
              <span>0/{application?.subTasks?.length}</span>
            </div>
          </div>

          <div className="flex flex-row-reverse">
            {application?.team?.map((m, index) => (
              <div
                key={index}
                className={clsx(
                  'w-7 h-7 rounded-full text-white flex items-center justify-center text-sm -mr-1',
                  BGS[index % BGS?.length]
                )}
              >
                <UserInfo user={m} />
              </div>
            ))}
          </div>
        </div>

        {application?.subTasks?.length > 0 ? (
          <div className="py-4 border-t border-gray-200">
            <h5 className="text-base line-clamp-1 text-black">
              {application?.subTasks[0].title}
            </h5>

            <div className="p-4 space-x-8">
              <span className="text-sm text-gray-600">
                {formatDate(new Date(application?.subTasks[0]?.date))}
              </span>
              <span className="bg-blue-600/10 px-3 py-1 rounded-full text-blue-700 font-medium">
                {application?.subTasks[0].tag}
              </span>
            </div>
          </div>
        ) : (
          <div className="py-4 border-t border-gray-200">
            <span className="text-gray-500">No Sub Task</span>
          </div>
        )}

        <div className="w-full pb-2">
          <button
            onClick={() => setOpen(true)}
            disabled={!user.isAdmin}
            className="w-full flex gap-4 items-center text-sm text-gray-500 font-semibold disabled:cursor-not-allowed disabled:text-gray-300"
          >
            <span>ADD SUBTASK</span>
          </button>
        </div>
      </div>
    </>
  )
}

export default ApplicationCard
