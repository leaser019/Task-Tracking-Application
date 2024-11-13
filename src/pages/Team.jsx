import React from 'react'
import Title from './../components/common/Title'
import ButtonElement from './../components/common/ButtonElement'
import { Add } from 'iconsax-react'
import { getInitials } from '../utils'
import clsx from 'clsx'
import { summary } from './../assets/data'

const Team = () => {
  const users = summary.users
  const [openDialog, setOpenDialog] = React.useState(false)
  const [open, setOpen] = React.useState(false)
  const [openAction, setOpenAction] = React.useState(false)
  const [selected, setSelected] = React.useState(null)

  const userActionHandler = () => {}
  const deleteHandler = () => {}

  const deleteClick = (id) => {
    setSelected(id)
    setOpenDialog(true)
  }

  const editClick = (el) => {
    setSelected(el)
    setOpen(true)
  }

  const TableHeader = React.useCallback(() => {
    return (
      <thead className="w-full border-b border-gray-300">
        <tr className="w-full text-black  text-left">
          <th className="py-2">Username</th>
          <th className="py-2">Role</th>
          <th className="py-2">Email</th>
          <th className="py-2 line-clamp-1">Title</th>
          <th className="py-2">Active</th>
        </tr>
      </thead>
    )
  })

  const TableRow = React.useCallback(
    ({ user }) => (
      <tr className="border-b border-gray-200 text-gray-600 hover:bg-gray-400/10">
        <td className="p-2">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full text-white flex items-center justify-center text-sm bg-blue-700">
              <span className="text-xs md:text-sm text-center">
                {getInitials(user.name)}
              </span>
            </div>
            {user.name}
          </div>
        </td>

        <td className="p-2">{user.title}</td>
        <td className="p-2">{user.email || 'user.emal.com'}</td>
        <td className="p-2">{user.role}</td>

        <td>
          <button
            // onClick={() => userStatusClick(user)}
            className={clsx(
              'w-fit px-4 py-1 rounded-full',
              user?.isActive ? 'bg-blue-200' : 'bg-yellow-100'
            )}
          >
            {user?.isActive ? 'Active' : 'Disabled'}
          </button>
        </td>

        <td className="p-2 flex gap-4 justify-end">
          <ButtonElement
            className="text-blue-600 hover:text-blue-500 font-semibold sm:px-0"
            label="Edit"
            type="button"
            onClick={() => editClick(user)}
          />

          <ButtonElement
            className="text-red-700 hover:text-red-500 font-semibold sm:px-0"
            label="Delete"
            type="button"
            onClick={() => deleteClick(user?._id)}
          />
        </td>
      </tr>
    ),
    []
  )

  return (
    <>
      <div className="w-full md:px-2 px-0 mb-6">
        <div className="flex item-center justify-between mb-8">
          <Title title="Teams" />
          <ButtonElement
            onClick={() => setOpen(true)}
            label="Add New User"
            icon={<Add size="20" color="#FFFFFF" />}
            className="flex flex-row-reverse gap-1 items-start bg-[#2563eb] text-white rounded-xl px-2 py-3  2xl:py-2.5"
          />
        </div>
        <div className="bg-white dark:bg-[#1f1f1f] px-2 md:px-4 py-4">
          <div className="overflow-x-auto">
            <table className="w-full mb-5">
              <TableHeader />
              <tbody>
                {users?.map((user, index) => (
                  <TableRow key={index} user={user} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* <AddUser
        open={open}
        setOpen={setOpen}
        userData={selected}
        key={new Date().getTime().toString()}
      />

      <ConfirmatioDialog
        open={openDialog}
        setOpen={setOpenDialog}
        onClick={deleteHandler}
      />

      <UserAction
        open={openAction}
        setOpen={setOpenAction}
        onClick={userActionHandler}
      /> */}
    </>
  )
}

export default Team
