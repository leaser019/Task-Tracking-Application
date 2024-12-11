import clsx from 'clsx'
import moment from 'moment'
import React, { useState } from 'react'
import { FaBug, FaTasks, FaThumbsUp, FaUser } from 'react-icons/fa'
import { GrInProgress } from 'react-icons/gr'
import {
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
  MdKeyboardDoubleArrowUp,
  MdOutlineDoneAll,
  MdOutlineMessage,
  MdTaskAlt,
  MdPending,
  MdDone,
} from 'react-icons/md'
import { RxActivityLog } from 'react-icons/rx'
import { useParams } from 'react-router-dom'
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material'
import { toast } from 'sonner'
import { useForm } from 'react-hook-form'
import Tabs from '../Tabs'
import { PRIORITY_STYLES, TASK_TYPE, getInitials } from '../../../../utils'
import Loading from '../../../common/Loading'
import ButtonElement from './../../../common/ButtonElement'
import Title from './../../../common/Title'
import {
  useGetAppicationByIdQuery,
  useCreateActivityApplicationMutation,
} from '../../../../redux/slices/api/applicationApiSlice'
import Error from '../../../common/Error'
import UserInfo from '../../application/UserInfo'
import Avatar from 'react-nice-avatar'
import { genConfig } from 'react-nice-avatar'
import AddSubApplication from '../../modal/AddSubApplication'
import AddMember from './AddMember'
import { useDeleteTaskMutation } from '../../../../redux/slices/api/applicationApiSlice'

const TaskIcon = ({ status }) => {
  let icon, taskBgColor, textColor

  switch (status) {
    case 'To Do':
      icon = <MdPending className="w-5 h-5" />
      taskBgColor = 'bg-gray-50'
      textColor = 'text-gray-600'
      break
    case 'In progress':
      icon = <MdTaskAlt className="w-5 h-5" />
      taskBgColor = 'bg-yellow-50'
      textColor = 'text-yellow-600'
      break
    case 'Done':
      icon = <MdDone className="w-5 h-5" />
      taskBgColor = 'bg-green-50'
      textColor = 'text-green-600'
      break
    default:
      icon = <MdTaskAlt className="w-5 h-5" />
      taskBgColor = 'bg-blue-50'
      textColor = 'text-blue-600'
  }

  return (
    <div className={`flex items-center ${taskBgColor} ${textColor}`}>
      {icon}
    </div>
  )
}

const assets = [
  'https://images.pexels.com/photos/270404/pexels-photo-270404.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  'https://images.pexels.com/photos/3861970/pexels-photo-3861970.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  'https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  'https://images.pexels.com/photos/3184631/pexels-photo-3184631.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  'https://images.pexels.com/photos/3184632/pexels-photo-3184632.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  'https://images.pexels.com/photos/3184633/pexels-photo-3184633.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  'https://images.pexels.com/photos/3184634/pexels-photo-3184634.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  'https://images.pexels.com/photos/3184635/pexels-photo-3184635.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  'https://images.pexels.com/photos/3184636/pexels-photo-3184636.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
]

const ICONS = {
  high: <MdKeyboardDoubleArrowUp />,
  medium: <MdKeyboardArrowUp />,
  low: <MdKeyboardArrowDown />,
  High: <MdKeyboardDoubleArrowUp />,
  Medium: <MdKeyboardArrowUp />,
  Low: <MdKeyboardArrowDown />,
}

const bgColor = {
  high: 'bg-red-200',
  medium: 'bg-yellow-200',
  low: 'bg-blue-200',
  High: 'bg-red-200',
  Medium: 'bg-yellow-200',
  Low: 'bg-blue-200',
}

const TABS = [
  { title: 'Application Detail', icon: <FaTasks /> },
  { title: 'Activities/Timeline', icon: <RxActivityLog /> },
]

const TASKTYPEICON = {
  QC1: (
    <div className="w-10 h-10 rounded-full bg-gray-500 flex items-center justify-center text-white">
      <MdOutlineMessage />
    </div>
  ),
  'Requirement Clarification': (
    <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white">
      <FaThumbsUp size={20} />
    </div>
  ),
  QC2: (
    <div className="w-6 h-6 flex items-center justify-center rounded-full bg-gray-500 text-white">
      <FaUser size={14} />
    </div>
  ),
  UAT: (
    <div className="text-red-600">
      <FaBug size={24} />
    </div>
  ),
  Deployment: (
    <div className="w-10 h-10 rounded-full bg-green-600 flex items-center justify-center text-white">
      <MdOutlineDoneAll size={24} />
    </div>
  ),
  Implementation: (
    <div className="w-8 h-8 flex items-center justify-center rounded-full bg-violet-600 text-white">
      <GrInProgress size={16} />
    </div>
  ),
}

const act_types = [
  'Requirement Clarification',
  'Implementation',
  'QC1',
  'UAT',
  'QC2',
  'Deployment',
]

const ApplicationDetail = () => {
  const { id } = useParams()
  const {
    data: task,
    refetch,
    isLoading,
    isError,
  } = useGetAppicationByIdQuery(id)
  const [visibleAssets, setVisibleAssets] = useState(4)
  const [tasks, setTasks] = useState(task?.tasks || [])
  const [selected, setSelected] = useState(0)
  const [open, setOpen] = useState(false)
  const [selectedTask, setSelectedTask] = useState(null)
  const [handleAddMember, setHandleAddMember] = useState(false)
  const [deleteTaskMutation] = useDeleteTaskMutation()

  const showMoreAssets = () => {
    setVisibleAssets((prev) => prev + 4)
  }

  const updateTaskStatus = (taskId, newStatus) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, status: newStatus } : task
    )
    setTasks(updatedTasks)
  }

  const editTask = (task) => {
    setSelectedTask(task)
    setOpen(true)
  }

  const deleteTask = async (task) => {
    try {
      await deleteTaskMutation({ app_id: id, task_id: task._id }).unwrap()
      toast.success('Task deleted successfully')
      onTaskAdded()
    } catch (error) {
      toast.error(error?.data?.message || 'Failed to delete task')
    }
  }
  const onTaskAdded = () => {
    refetch()
  }

  return isLoading ? (
    <div className="flex justify-center items-center h-screen ">
      <Loading className="w-12 h-12 text-blue-600" />
    </div>
  ) : isError ? (
    <div className="flex justify-center items-center h-screen bg-gray-50">
      <Error className="max-w-lg mx-auto" />
    </div>
  ) : (
    <>
      <AddMember
        open={handleAddMember}
        setOpen={setHandleAddMember}
        appId={id}
        refetch={refetch}
      />
      <AddSubApplication
        open={open}
        setOpen={setOpen}
        appDetail={selectedTask}
        id={selectedTask?._id}
        onTaskAdded={onTaskAdded}
      />
      <div className="min-h-screen bg-gray-50 px-4 py-8 md:px-6 lg:px-8">
        <div className="w-full flex space-y-6">
          <Title
            title={task?.title}
            className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 items-center aligns-center"
          />
        </div>
        {/* Main Content */}
        <div className=" rounded-xl shadow-lg ">
          <Tabs
            tabs={TABS}
            setSelected={setSelected}
            className="border-b border-gray-200"
          >
            {selected === 0 ? (
              <div className="p-6 md:p-8 space-y-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Left Column */}
                  <div className="space-y-6">
                    {/* Priority and Status */}
                    <div className="flex flex-wrap gap-4">
                      <div
                        className={clsx(
                          'flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300',
                          PRIORITY_STYLES[task?.priority],
                          bgColor[task?.priority],
                          'hover:shadow-md'
                        )}
                      >
                        <span className="text-lg">{ICONS[task?.priority]}</span>
                        <span className="font-semibold uppercase tracking-wide">
                          {task?.priority} Priority
                        </span>
                      </div>

                      <div className="flex items-center gap-3 px-4 py-2 bg-gray-100 rounded-full">
                        <div
                          className={clsx(
                            'w-3 h-3 rounded-full animate-pulse',
                            TASK_TYPE[task?.title]
                          )}
                        />
                        <span className="font-medium uppercase">
                          {task?.status}
                        </span>
                      </div>
                    </div>

                    {/* Creation Date */}
                    <div className="text-gray-600">
                      Created:{' '}
                      {new Date(task?.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </div>

                    {/* Description */}
                    <div className="bg-gray-50 rounded-xl p-6 space-y-4">
                      <h3 className="font-semibold text-gray-700">
                        Description
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {task?.description}
                      </p>
                    </div>

                    {/* Team Members */}
                    <div className=" bg-white rounded-xl shadow-sm p-6 space-y-4">
                      <div className="flex space-x-40">
                        <h3 className="font-semibold text-gray-700">
                          Team Members
                        </h3>
                        <ButtonElement
                          onClick={() => {
                            setHandleAddMember(true)
                          }}
                          className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-8 rounded-lg shadow-md transition-all duration-300 text-xs pb-2
                        "
                          label=" Add Team Member"
                        ></ButtonElement>
                      </div>
                      <div className="divide-y divide-gray-100">
                        {task?.teamMembers?.map((member, index) => (
                          <div
                            key={index}
                            className="flex items-center gap-4 py-4 group hover:bg-gray-50 rounded-lg transition-colors duration-200"
                          >
                            <UserInfo user={member} />
                            <div>
                              <p className="font-medium text-gray-800">
                                {member?.user_name}
                              </p>
                              <p className="text-sm text-gray-500">
                                {member?.role}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right Column */}
                  <div className="space-y-6">
                    {/* Tasks */}
                    <div className="bg-white rounded-lg shadow p-6 space-y-4">
                      <div className="flex justify-between items-center">
                        <h3 className="font-semibold text-gray-700">Tasks</h3>
                        <div className="flex items-center space-x-2">
                          <ButtonElement
                            onClick={() => toast('Invite Team Member')}
                            className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded transition duration-300 text-sm"
                            label="Add Task"
                          />
                        </div>
                      </div>
                      <div className="space-y-4">
                        {task?.tasks?.map((task, index) => (
                          <div
                            key={index}
                            className="flex items-start gap-4 p-4 rounded hover:bg-gray-50 transition duration-200"
                          >
                            <div className="w-10 h-10 flex-shrink-0 rounded-full bg-blue-50 flex items-center justify-center">
                              <TaskIcon status={task?.status} />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <p className="text-gray-700 font-medium flex-1">
                                  {task.title}
                                </p>
                                <span className="text-sm text-gray-500">
                                  Deadline:{' '}
                                  {new Date(task?.deadline).toDateString()}
                                </span>
                                <span className="px-2 py-1 text-xs font-medium bg-blue-50 text-blue-700 rounded-full">
                                  {task.tag}
                                </span>
                              </div>
                              <div className="flex items-center justify-between gap-4 p-4 rounded w-full">
                                <div className="flex-1 flex justify-center">
                                  <span
                                    className={`px-4 py-1.5 text-sm font-medium rounded-full inline-flex items-center justify-center ${
                                      task.status === 'completed'
                                        ? 'bg-green-100 text-green-700'
                                        : task.status === 'pending'
                                        ? 'bg-yellow-100 text-yellow-700'
                                        : 'bg-gray-100 text-gray-700'
                                    }`}
                                  >
                                    {task.status || 'Not Set'}
                                  </span>
                                </div>
                                <div className="flex items-center gap-3">
                                  <button
                                    className="inline-block w-24 text-white bg-gradient-to-r from-blue-400 to-blue-600 hover:from-blue-500 hover:to-blue-700
                                    font-semibold py-1.5 px-3 rounded-lg transition-all duration-300
                                    shadow-sm hover:shadow-md transform hover:-translate-y-0.5
                                    border border-blue-400 hover:border-blue-600
                                    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                                    onClick={() => editTask(task)}
                                  >
                                    Edit
                                  </button>
                                  <button
                                    className="inline-block w-24 text-white bg-gradient-to-r from-red-400 to-red-600 hover:from-red-500 hover:to-red-700
                                    font-semibold py-1.5 px-3 rounded-lg transition-all duration-300
                                    shadow-sm hover:shadow-md transform hover:-translate-y-0.5
                                    border border-red-400 hover:border-red-600
                                    focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                                    onClick={() => deleteTask(task)}
                                  >
                                    Delete
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    {/* Assets Gallery */}
                    <div className="bg-white rounded-xl shadow-sm p-6 space-y-4">
                      <h3 className="font-semibold text-gray-700">
                        Assets Gallery
                      </h3>
                      <div className="grid grid-cols-2 gap-4">
                        {assets.slice(0, visibleAssets).map((asset, index) => (
                          <div
                            key={index}
                            className="aspect-video rounded-lg overflow-hidden group relative"
                          >
                            <img
                              src={asset}
                              alt={`Asset ${index + 1}`}
                              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
                          </div>
                        ))}
                      </div>
                      {visibleAssets < assets.length && (
                        <div className="flex justify-center mt-4">
                          <button
                            onClick={showMoreAssets}
                            className="text-blue-500 hover:text-blue-700 font-semibold py-2 px-4 rounded-lg transition-all duration-300"
                          >
                            <MdKeyboardArrowDown size={24} />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <Activities
                activity={task?.activities}
                id={id}
                refetch={refetch}
              />
            )}
          </Tabs>
        </div>
      </div>
    </>
  )
}

const Activities = ({ activity, id, refetch }) => {
  const mainColor = '#0084ff'
  const config = genConfig({
    id: JSON.stringify(id),
    bgColor: { mainColor },
  })
  const [selected, setSelected] = useState(act_types[0])
  const [createActivity] = useCreateActivityApplicationMutation()

  const { register, handleSubmit: handleFormSubmit } = useForm()

  const handleSubmit = async (payload) => {
    try {
      await createActivity({ ...payload, title: selected, appId: id }).unwrap()
      toast.success('Activity added successfully')
      refetch()
    } catch (error) {
      toast.error('Failed to add activity')
    }
    console.log({ ...payload, title: selected, appId: id })
  }

  const Card = ({ item }) => {
    return (
      <div className="flex space-x-4 group hover:bg-gray-50 p-4 rounded-lg transition-all duration-300">
        <div className="flex flex-col items-center flex-shrink-0">
          <div className="w-12 h-12 flex items-center justify-center rounded-full bg-white shadow-md transform group-hover:scale-105 transition-transform duration-300">
            {TASKTYPEICON[item?.title]}
          </div>
          <div className="w-full flex items-center justify-center">
            <div className="w-0.5 bg-gray-200 h-full group-hover:bg-gray-300 transition-colors duration-300"></div>
          </div>
        </div>

        <div className="flex flex-col gap-y-2 mb-8 w-full">
          <div className="flex justify-between items-center">
            <h3 className="font-semibold text-lg text-gray-800">
              {item?.title}
            </h3>
            <span className="text-sm text-gray-500">
              {moment(item?.date).fromNow()}
            </span>
          </div>

          <div className="text-gray-600 space-y-2">
            <p className="capitalize text-sm bg-gray-50 p-2 rounded-md">
              {item?.comment}
            </p>
          </div>

          <div className=" flex text-gray-700 bg-white p-3 rounded-xl shadow-sm border border-gray-100">
            <Avatar className="w-7 h-7" {...config} />{' '}
            <div className="pt-1 pl-4">{item?.user_name}</div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      <form onSubmit={handleFormSubmit(handleSubmit)}>
        <div className="w-full flex flex-col lg:flex-row gap-8 2xl:gap-20 min-h-screen p-6 rounded-xl">
          {/* Activities Timeline */}
          <div className="w-full lg:w-3/5">
            <h4 className="text-gray-800 font-semibold text-xl mb-8 pb-2 border-b border-gray-200">
              Activities Timeline
            </h4>

            <div className="w-full space-y-2">
              {activity?.map((el, index) => (
                <Card
                  key={index}
                  item={el}
                  isConnected={index < activity.length - 1}
                />
              ))}
            </div>
          </div>

          {/* Add Activity Form */}
          <div className="w-full lg:w-2/5 bg-gray-50 p-6 rounded-xl h-fit sticky top-4">
            <h4 className="text-gray-800 font-semibold text-xl mb-6">
              Add New Activity
            </h4>

            <div className="space-y-6">
              {/* Activity Type Selection */}
              <div className="grid grid-cols-2 gap-4">
                {act_types.map((item) => (
                  <div
                    key={item}
                    className={`flex items-center gap-2 p-3 rounded-xl cursor-pointer transition-all duration-300 ${
                      selected === item
                        ? 'bg-blue-50 border-2 border-blue-500'
                        : 'bg-white border border-gray-200 hover:border-blue-300'
                    }`}
                    onClick={() => setSelected(item)}
                  >
                    <input
                      type="checkbox"
                      className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                      checked={selected === item}
                    />
                    <p className="text-sm font-medium text-gray-700 p-2">
                      {item}
                    </p>
                  </div>
                ))}
              </div>

              {/* Activity Description */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Activity Description
                </label>
                <textarea
                  rows={6}
                  placeholder="Describe the activity details..."
                  className="w-full rounded-lg border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 resize-none shadow-sm transition-all duration-300 p-4"
                  {...register('comment')}
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg shadow-md transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                Add Activity
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  )
}
export default ApplicationDetail
