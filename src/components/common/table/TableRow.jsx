import React from 'react'
import clsx from 'clsx'
import { Message, AttachSquare, Chart2 } from 'iconsax-react'
import { TiDelete } from 'react-icons/ti'
import { GrPowerReset } from 'react-icons/gr'
import { BiMessageSquareEdit } from 'react-icons/bi'
import {
  TASK_TYPE,
  BGS,
  PRIORITY_STYLES,
  ICONS,
  formatDate,
} from '../../../utils'
import ButtonElement from '../../common/ButtonElement'
import UserInfo from '../../apps/application/UserInfo'

const TableRow = ({ application, show = '' }) => {
  const [openDialog, setOpenDialog] = React.useState(false)
  const [selected, setSelected] = React.useState(null)

  const StatIcon = ({ icon, count }) => (
    <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gray-50">
      {icon}
      <span className="text-sm font-medium text-gray-700">{count}</span>
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

  return (
    <tr className="border-b border-gray-100">
      <td className="py-4 pl-6">
        <div className="flex items-center gap-3">
          <div
            className={clsx(
              'w-3 h-3 rounded-full',
              TASK_TYPE[application?.status]
            )}
          />
          <p className="text-base font-medium text-gray-800 line-clamp-2">
            {application?.title}
          </p>
        </div>
      </td>

      <td className="py-4">
        <div
          className={clsx(
            'flex items-center gap-2 px-3 py-1.5 rounded-full',
            PRIORITY_STYLES[application?.priority]
          )}
        >
          <span className="text-xl">{ICONS[application?.priority]}</span>
          <span className="text-sm font-medium capitalize">
            {application?.priority} Priority
          </span>
        </div>
      </td>

      <td className="py-4">
        <span className="text-sm font-medium text-gray-600 px-3 py-1.5 rounded-lg bg-gray-50">
          {formatDate(new Date(application?.createdAt))}
        </span>
      </td>

      <td className="py-4">
        <div className="flex items-center gap-4">
          <StatIcon
            icon={<Message size="18" color="#4B5563" />}
            count={application?.activities?.length}
          />
          <StatIcon
            icon={<AttachSquare size="18" color="#4B5563" />}
            count={application?.assets?.length}
          />
          <StatIcon
            icon={<Chart2 size="18" color="#4B5563" />}
            count={`0/${application?.tasks?.length}`}
          />
        </div>
      </td>

      <td className="py-4">
        <div className="flex -space-x-2">
          <TeamMembers team={application?.teamMembers} />
        </div>
      </td>

      <td className="py-4 pr-6">
        <div className="flex items-center justify-end gap-3">
          {show === 'list-view' ? (
            <ButtonElement
              className="px-4 py-2 rounded-lg bg-blue-50 text-blue-600 flex items-center gap-2"
              icon={<BiMessageSquareEdit size="18" />}
              label="Edit"
              type="button"
            />
          ) : (
            <ButtonElement
              className="px-4 py-2 rounded-lg bg-green-50 text-green-600 flex items-center gap-2"
              icon={<GrPowerReset size="18" />}
              label="Restore"
              type="button"
            />
          )}

          <ButtonElement
            className="px-4 py-2 rounded-lg bg-red-50 text-red-600 flex items-center gap-2"
            icon={<TiDelete size="18" />}
            label="Delete"
            type="button"
            onClick={() => {}}
          />
        </div>
      </td>
    </tr>
  )
}

export default TableRow
