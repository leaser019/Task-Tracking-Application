import React from 'react'
import Title from './../components/common/Title'
import ButtonElement from './../components/common/ButtonElement'
import { Add } from 'iconsax-react'
import { BiMessageSquareEdit } from 'react-icons/bi'
import { getInitialsUsername } from '../utils'
import { GrPowerReset } from 'react-icons/gr'
import { TiDelete } from 'react-icons/ti'
import clsx from 'clsx'
import AddUser from '../components/apps/team/AddUser'
import ConfirmatioDialog, { UserAction } from '../components/apps/team/Dialog'
import { useDispatch } from 'react-redux'
import {
  useGetAllUsersQuery,
  useDeleteUserMutation,
  useActiveAccountMutation,
  useDeleteUserForeverMutation,
} from '../redux/slices/api/teamApiSlice'
import { toast } from 'sonner'
import Loading from './../components/common/Loading'

const Team = () => {
  const dispatch = useDispatch()
  const [openDialog, setOpenDialog] = React.useState(false)
  const [open, setOpen] = React.useState(false)
  const [openAction, setOpenAction] = React.useState(false)
  const [selected, setSelected] = React.useState(null)
  const { data: users, refetch, isLoading, isError } = useGetAllUsersQuery()
  const [deleteUser] = useDeleteUserMutation()
  const [activeAccount] = useActiveAccountMutation()
  const [deleteTeam] = useDeleteUserForeverMutation()

  const userActionHandler = () => {}

  const activateHandler = React.useCallback(
    async (email) => {
      try {
        const { message } = await activeAccount(email).unwrap()
        toast.success(message || 'User activated successfully!')
        refetch()
      } catch (error) {
        const errorMessage =
          error?.message ||
          error?.data?.message ||
          error?.data?.detail ||
          error?.data?.errors ||
          'An error occurred: unknown error'
        toast.error(errorMessage)
      }
    },
    [activeAccount, refetch]
  )

  const deleteHandler = React.useCallback(
    async (email) => {
      try {
        const { message } = await deleteUser(email).unwrap()
        toast.success(message || 'User deleted successfully!')
        refetch()
      } catch (error) {
        const errorMessage =
          error?.message ||
          error?.data?.message ||
          error?.data?.detail ||
          error?.data?.errors ||
          'An error occurred: unknown error'
        toast.error(errorMessage)
      }
    },
    [deleteUser, refetch]
  )

  const deleteForeverHandler = React.useCallback(
    async (email) => {
      try {
        const { message } = await deleteTeam(email).unwrap()
        toast.success(message || 'User deleted successfully!')
        refetch()
      } catch (error) {
        const errorMessage =
          error?.message ||
          error?.data?.message ||
          error?.data?.detail ||
          error?.data?.errors ||
          'An error occurred: unknown error'
        toast.error(errorMessage)
      }
    },
    [deleteTeam, refetch]
  )

  const deleteClick = (email) => {
    setSelected(email)
    setOpenDialog(true)
  }

  const editClick = (el) => {
    setSelected(el)
    setOpen(true)
  }

  const TableHeader = React.useCallback(() => {
    return (
      <thead className="w-full border-b border-gray-300 bg-gray-50">
        <tr className="w-full text-gray-700 text-left">
          <th className="py-3 px-4 font-semibold">Username</th>
          <th className="py-3 px-4 font-semibold">Email</th>
          <th className="py-3 px-4 font-semibold">Role</th>
          <th className="py-3 px-4 font-semibold">Status</th>
          <th className="py-3 px-4 font-semibold pl-16">Actions</th>
        </tr>
      </thead>
    )
  }, [])

  const TableRow = React.useCallback(
    ({ user }) => (
      <tr className="border-b border-gray-200 text-gray-600">
        <td className="p-2">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full text-white flex items-center justify-center text-sm bg-blue-700">
              <span className="text-xs md:text-sm text-center">
                {getInitialsUsername(user?.user_name) || ''}
              </span>
            </div>
            {user?.user_name || 'Unknown User'}
          </div>
        </td>
        <td className="p-2">{user.email || 'No Email'}</td>
        <td className="p-2">{user.role || 'No Role'}</td>

        <td>
          <button
            className={clsx(
              'w-fit px-4 py-1 rounded-full',
              user?.isActive ? 'bg-green-200' : 'bg-yellow-100'
            )}
          >
            {user?.isActive ? 'Active' : 'Disabled'}
          </button>
        </td>

        <td className="p-2 flex gap-4 justify-end">
          {user?.isActive ? (
            <ButtonElement
              className="px-4 py-2 rounded-lg bg-blue-50 text-blue-600 flex items-center gap-4"
              icon={<BiMessageSquareEdit size="18" />}
              label="Edit"
              type="button"
              onClick={() => editClick(user)}
            />
          ) : (
            <ButtonElement
              className="px-4 py-2 rounded-lg bg-red-50 text-red-600 flex items-center gap-1"
              icon={<TiDelete size="18" />}
              label="Delete"
              type="button"
              onClick={() => deleteForeverHandler(user?.email)}
            />
          )}
          {user?.isActive ? (
            <ButtonElement
              className="px-4 py-2 rounded-lg bg-red-50 text-red-600 flex items-center gap-2"
              icon={<TiDelete size="18" />}
              label="Disable Account"
              type="button"
              onClick={() => deleteHandler(user?.email)}
            />
          ) : (
            <ButtonElement
              className="px-4 py-2 rounded-lg bg-green-50 text-green-600 flex items-center gap-2"
              icon={<GrPowerReset size="18" />}
              label="Activate Account"
              type="button"
              onClick={() => activateHandler(user?.email)}
            />
          )}
        </td>
      </tr>
    ),
    [editClick, deleteClick, deleteHandler, activateHandler]
  )

  return isLoading ? (
    <div className="flex justify-center items-center h-screen">
      <Loading />
    </div>
  ) : (
    <>
      <div className="w-full md:px-2 px-0 mb-6">
        <div className="flex items-center justify-between mb-8">
          <Title title="Teams" />
          <ButtonElement
            onClick={() => {
              setOpen(true)
              setSelected(null)
            }}
            label="Add New User"
            icon={<Add size="20" color="#FFFFFF" />}
            className="flex flex-row-reverse gap-1 items-center bg-blue-600 text-white rounded-xl px-4 py-2"
          />
        </div>
        <div className="bg-white px-2 md:px-4 py-4">
          <div className="overflow-x-auto">
            <table className="w-full mb-5">
              <TableHeader />
              <tbody>
                {isLoading ? (
                  <tr>
                    <td colSpan="5" className="text-center py-4">
                      <Loading />
                    </td>
                  </tr>
                ) : (
                  users?.map((user, index) => (
                    <TableRow key={index} user={user} />
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <AddUser
        open={open}
        setOpen={setOpen}
        userData={selected}
        key={new Date().getTime().toString()}
        refetch={refetch}
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
      />
    </>
  )
}

export default Team
