import React from 'react'
import clsx from 'clsx'
import { TASK_TYPE } from '../../../utils'
import { BGS } from '../../../utils'
import { PRIORITY_STYLES } from '../../../utils'
import { formatDate } from '../../../utils'
import ButtonElement from '../../common/ButtonElement'
import UserInfo from '../../apps/application/UserInfo'
import { Message } from 'iconsax-react'
import { AttachSquare } from 'iconsax-react'
import { Chart2 } from 'iconsax-react'
import { ICONS } from '../../../utils/index'
import { TiDelete } from 'react-icons/ti'
import { GrPowerReset } from 'react-icons/gr'
import { BiMessageSquareEdit } from 'react-icons/bi'

const TableRow = ({ application, show = '' }) => {
  const [openDialog, setOpenDialog] = React.useState(false)
  const [selected, setSelected] = React.useState(null)
  const deleteClicks = (id) => {
    setSelected(id)
    setOpenDialog(true)
  }
  return (
    <>
      <tr className="border-b border-gray-200 text-gray-600 hover:bg-gray-300/10">
        <td className="py-2">
          <div className="flex items-center gap-2">
            <div
              className={clsx(
                'w-3 h-3 rounded-full',
                TASK_TYPE[application.stage]
              )}
            />
            <p className="w-full line-clamp-2 text-base text-black">
              {application?.title}
            </p>
          </div>
        </td>

        <td className="py-2">
          <div className={'flex gap-1 items-center'}>
            <span
              className={clsx(
                'text-base',
                PRIORITY_STYLES[application?.priority]
              )}
            >
              {ICONS[application?.priority]}
            </span>
            <span className="capitalize line-clamp-1">
              {application?.priority} Priority
            </span>
          </div>
        </td>

        <td className="py-2">
          <span className="text-sm text-gray-600">
            {formatDate(new Date(application?.date))}
          </span>
        </td>

        <td className="py-2">
          <div className="flex items-center gap-3">
            <div className="flex gap-1 items-center text-sm text-gray-600">
              <Message size="16" color="#697689" />
              <span>{application?.activities?.length}</span>
            </div>
            <div className="flex gap-1 items-center text-sm text-gray-600 dark:text-gray-400">
              <AttachSquare size="16" color="#697689" />
              <span>{application?.assets?.length}</span>
            </div>
            <div className="flex gap-1 items-center text-sm text-gray-600 dark:text-gray-400">
              <Chart2 size="16" color="#697689" />
              <span>0/{application?.subTasks?.length}</span>
            </div>
          </div>
        </td>

        <td className="py-2">
          <div className="flex">
            {application?.team?.map((m, index) => (
              <div
                key={m._id}
                className={clsx(
                  'w-6 h-6 rounded-full text-white flex items-center justify-center text-sm -mr-1',
                  BGS[index % BGS?.length]
                )}
              >
                <UserInfo user={m} />
              </div>
            ))}
          </div>
        </td>

        <td className="py-2 flex gap-2 md:gap-4 justify-end">
          {show == 'list-view' ? (
            <ButtonElement
              className="text-blue-600 hover:text-blue-500 sm:px-0 text-sm md:text-base flex flex-row-reverse"
              icon={<BiMessageSquareEdit size="15" className="mt-1 mr-1" />}
              label="Edit"
              type="button"
            />
          ) : (
            <ButtonElement
              className="text-blue-600 hover:text-blue-500 sm:px-0 text-sm md:text-base flex flex-row-reverse"
              icon={<GrPowerReset size="15" className="mt-1 mr-1" />}
              label="Restore"
              type="button"
            />
          )}

          <ButtonElement
            className="text-red-700 hover:text-red-500 sm:px-0 text-sm md:text-base flex flex-row-reverse"
            icon={<TiDelete size="15" className="mt-1 mr-1" />}
            label="Delete "
            type="button"
            onClick={() => deleteClicks(application._id)}
          />
        </td>
      </tr>
    </>
  )
}

export default TableRow
