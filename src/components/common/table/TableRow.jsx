import React from 'react'
import clsx from 'clsx'
import { motion } from 'framer-motion'
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
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="flex items-center gap-2 px-3 py-1.5 rounded-lg
                 bg-gray-50/50 backdrop-blur-sm
                 hover:bg-gray-100/60 hover:shadow-sm
                 transition-all duration-300"
    >
      {icon}
      <span className="text-sm font-medium text-gray-700">{count}</span>
    </motion.div>
  )

  return (
    <motion.tr
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={clsx(
        'border-b border-gray-100',
        'hover:bg-blue-50/30 hover:backdrop-blur-sm',
        'group transition-all duration-300'
      )}
    >
      <td className="py-4 pl-6">
        <div className="flex items-center gap-3">
          <motion.div
            whileHover={{ scale: 1.2 }}
            className={clsx(
              'w-3 h-3 rounded-full shadow-sm',
              TASK_TYPE[application.stage]
            )}
          />
          <p
            className="text-base font-medium text-gray-800 line-clamp-2
                      group-hover:text-gray-900"
          >
            {application?.title}
          </p>
        </div>
      </td>

      <td className="py-4">
        <motion.div
          whileHover={{ scale: 1.02 }}
          className={clsx(
            'flex items-center gap-2 px-3 py-1.5 rounded-full',
            'transition-all duration-300',
            PRIORITY_STYLES[application?.priority]
          )}
        >
          <span className="text-xl group-hover:scale-110 transition-transform">
            {ICONS[application?.priority]}
          </span>
          <span className="text-sm font-medium capitalize">
            {application?.priority} Priority
          </span>
        </motion.div>
      </td>

      <td className="py-4">
        <span
          className="text-sm font-medium text-gray-600 px-3 py-1.5 rounded-lg
                       bg-gray-50/50 backdrop-blur-sm"
        >
          {formatDate(new Date(application?.date))}
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
            count={`0/${application?.subTasks?.length}`}
          />
        </div>
      </td>

      <td className="py-4">
        <div className="flex -space-x-2">
          {application?.team?.map((member, index) => (
            <motion.div
              key={member._id}
              whileHover={{ scale: 1.1, zIndex: 10 }}
              className={clsx(
                'w-8 h-8 rounded-full',
                'border-2 border-white',
                'flex items-center justify-center',
                'shadow-sm hover:shadow-md',
                'transition-all duration-300',
                BGS[index % BGS?.length]
              )}
            >
              <UserInfo user={member} />
            </motion.div>
          ))}
        </div>
      </td>

      <td className="py-4 pr-6">
        <div className="flex items-center justify-end gap-3">
          {show === 'list-view' ? (
            <motion.div whileHover={{ scale: 1.02 }}>
              <ButtonElement
                className={clsx(
                  'px-4 py-2 rounded-lg',
                  'bg-blue-50/50 text-blue-600',
                  'hover:bg-blue-100/80 hover:text-blue-700',
                  'backdrop-blur-sm shadow-sm',
                  'transition-all duration-300',
                  'flex items-center gap-2'
                )}
                icon={
                  <BiMessageSquareEdit
                    size="18"
                    className="group-hover:rotate-12 transition-transform"
                  />
                }
                label="Edit"
                type="button"
              />
            </motion.div>
          ) : (
            <motion.div whileHover={{ scale: 1.02 }}>
              <ButtonElement
                className={clsx(
                  'px-4 py-2 rounded-lg',
                  'bg-green-50/50 text-green-600',
                  'hover:bg-green-100/80 hover:text-green-700',
                  'backdrop-blur-sm shadow-sm',
                  'transition-all duration-300',
                  'flex items-center gap-2'
                )}
                icon={<GrPowerReset size="18" />}
                label="Restore"
                type="button"
              />
            </motion.div>
          )}

          <motion.div whileHover={{ scale: 1.02 }}>
            <ButtonElement
              className={clsx(
                'px-4 py-2 rounded-lg',
                'bg-red-50/50 text-red-600',
                'hover:bg-red-100/80 hover:text-red-700',
                'backdrop-blur-sm shadow-sm',
                'transition-all duration-300',
                'flex items-center gap-2'
              )}
              icon={<TiDelete size="18" />}
              label="Delete"
              type="button"
              onClick={() => {}}
            />
          </motion.div>
        </div>
      </td>
    </motion.tr>
  )
}

export default TableRow
