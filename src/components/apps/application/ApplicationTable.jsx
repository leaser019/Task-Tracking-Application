import React from 'react'
import clsx from 'clsx'
import { TASK_TYPE } from '../../../utils'
import { BGS } from '../../../utils'
import { PRIORITY_STYLES } from '../../../utils'
import { formatDate } from '../../../utils'
import ButtonElement from '../../common/ButtonElement'
import UserInfo from './UserInfo'

const ApplicationTable = ({ applications }) => {

 const ICONS = {
  high: "",
  medium: "",
  low: ''
 };

 const [openDialog, setOpenDialog] = React.useState(false)
 const [selected, setSelected] = React.useState(null)

 const deleteClicks = (id) => {
  setSelected(id);
  setOpenDialog(true);
 }

 const TableHeader = () => (
  <thead className='w-full border-b border-gray-300'>
   <tr className='w-full text-black  text-left'>
    <th className='py-2'>Task Title</th>
    <th className='py-2'>Priority</th>
    <th className='py-2 line-clamp-1'>Created At</th>
    <th className='py-2'>Assets</th>
    <th className='py-2'>Team</th>
   </tr>
  </thead>
 );

 const TableRow = ({ application }) => (
  <tr className='border-b border-gray-200 text-gray-600 hover:bg-gray-300/10'>
   <td className='py-2'>
    <div className='flex items-center gap-2'>
     <div
      className={clsx("w-4 h-4 rounded-full", TASK_TYPE[application.stage])}
     />
     <p className='w-full line-clamp-2 text-base text-black'>
      {application?.title}
     </p>
    </div>
   </td>

   <td className='py-2'>
    <div className={"flex gap-1 items-center"}>
     <span className={clsx("text-lg", PRIORITY_STYLES[application?.priority])}>
      {ICONS[application?.priority]}
     </span>
     <span className='capitalize line-clamp-1'>
      {application?.priority} Priority
     </span>
    </div>
   </td>

   <td className='py-2'>
    <span className='text-sm text-gray-600'>
     {formatDate(new Date(application?.date))}
    </span>
   </td>

   <td className='py-2'>
    <div className='flex items-center gap-3'>
     <div className='flex gap-1 items-center text-sm text-gray-600'>
      {/* <BiMessageAltDetail /> */}
      <span>{application?.activities?.length}</span>
     </div>
     <div className='flex gap-1 items-center text-sm text-gray-600 dark:text-gray-400'>
      {/* <MdAttachFile /> */}
      <span>{application?.assets?.length}</span>
     </div>
     <div className='flex gap-1 items-center text-sm text-gray-600 dark:text-gray-400'>
      {/* <FaList /> */}
      <span>0/{application?.subTasks?.length}</span>
     </div>
    </div>
   </td>

   <td className='py-2'>
    <div className='flex'>
     {application?.team?.map((m, index) => (
      <div
       key={m._id}
       className={clsx(
        "w-7 h-7 rounded-full text-white flex items-center justify-center text-sm -mr-1",
        BGS[index % BGS?.length]
       )}
      >
       <UserInfo user={m} />
      </div>
     ))}
    </div>
   </td>

   <td className='py-2 flex gap-2 md:gap-4 justify-end'>
    <ButtonElement
     className='text-blue-600 hover:text-blue-500 sm:px-0 text-sm md:text-base'
     label='Edit'
     type='button'
    />

    <ButtonElement
     className='text-red-700 hover:text-red-500 sm:px-0 text-sm md:text-base'
     label='Delete'
     type='button'
     onClick={() => deleteClicks(application._id)}
    />
   </td>
  </tr>
 );

 return (
  <>
   <div className='overflow-x-auto px-2 py-2'>
    <table className='w-full '>
     <TableHeader />
     <tbody className='w-full'>
      {applications.map((application, index) => (<TableRow key={index} application={application} />))}
     </tbody>
    </table>
   </div>
  </>
 )
}

export default ApplicationTable