import React, { Fragment, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AiTwotoneFolderOpen } from 'react-icons/ai'
import { BsThreeDots } from 'react-icons/bs'
import { HiDuplicate } from 'react-icons/hi'
import { MdAdd, MdOutlineEdit } from 'react-icons/md'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { Menu, Transition } from '@headlessui/react'
import AddApplication from '../../modal/AddApplication'
import AddSubApplication from '../../modal/AddSubApplication'
import ConfirmatioDialog from '../../team/Dialog'
import {
  useDuplicateApplicationMutation,
  useMakeTrashApplicationMutation,
} from '../../../../redux/slices/api/applicationApiSlice'
import { toast } from 'sonner'
import Loading from '../../../common/Loading'
import { useSelector } from 'react-redux'

const ApplicationDialog = ({ application, refetch }) => {
  const [open, setOpen] = useState(false)
  const [openEdit, setOpenEdit] = useState(false)
  const [openDialog, setOpenDialog] = useState(false)
  const [duplicateApplication] = useDuplicateApplicationMutation()
  const [deleteApplication] = useMakeTrashApplicationMutation()
  const navigate = useNavigate()

  const duplicateHandler = async () => {
    try {
      await duplicateApplication(application?._id)
      toast.success('Application duplicated successfully')
      refetch()
    } catch (error) {
      toast.error(error?.message || 'Failed to duplicate application')
    }
  }

  const deleteClicks = () => {
    setOpenDialog(true)
  }
  const deleteHandler = async () => {
    try {
      await deleteApplication(application?.title)
      toast.success('Application deleted successfully')
      setOpenDialog(false)
      refetch()
    } catch (error) {
      setOpenDialog(false)
      toast.error(error?.message || 'Failed to delete application')
    }
  }

  const items = [
    {
      label: 'Open Application',
      icon: <AiTwotoneFolderOpen className="mr-2 h-5 w-5" aria-hidden="true" />,
      onClick: () => navigate(`/application/${application._id}`),
    },
    {
      label: 'Edit',
      icon: <MdOutlineEdit className="mr-2 h-5 w-5" aria-hidden="true" />,
      onClick: () => setOpenEdit(true),
    },
    {
      label: 'Add Task',
      icon: <MdAdd className="mr-2 h-5 w-5" aria-hidden="true" />,
      onClick: () => setOpen(true),
    },
    {
      label: 'Duplicate',
      icon: <HiDuplicate className="mr-2 h-5 w-5" aria-hidden="true" />,
      onClick: () => duplicateHandler(),
    },
  ]

  return (
    <>
      <div>
        <Menu as="div" className="relative inline-block text-left">
          <Menu.Button className="inline-flex w-full justify-center rounded-md px-4 py-2 text-sm font-medium text-gray-600 ">
            <BsThreeDots />
          </Menu.Button>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute p-4 right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
              <div className="px-1 py-1 space-y-2">
                {items.map((el) => (
                  <Menu.Item key={el.label}>
                    {({ active }) => (
                      <button
                        onClick={el?.onClick}
                        className={`${
                          active ? 'bg-blue-500 text-white' : 'text-gray-900'
                        } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                      >
                        {el.icon}
                        {el.label}
                      </button>
                    )}
                  </Menu.Item>
                ))}
              </div>

              <div className="px-1 py-1">
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={() => deleteClicks()}
                      className={`${
                        active ? 'bg-blue-500 text-white' : 'text-red-900'
                      } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                    >
                      <RiDeleteBin6Line
                        className="mr-2 h-5 w-5 text-red-400"
                        aria-hidden="true"
                      />
                      Delete
                    </button>
                  )}
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>

      <AddApplication
        open={openEdit}
        setOpen={setOpenEdit}
        application={application}
        refetch={refetch}
        key={new Date().getTime()}
      />

      <AddSubApplication open={open} setOpen={setOpen} />

      <ConfirmatioDialog
        open={openDialog}
        setOpen={setOpenDialog}
        onClick={deleteHandler}
      />
    </>
  )
}

export default ApplicationDialog
