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
} from 'react-icons/md'
import { RxActivityLog } from 'react-icons/rx'
import { useParams } from 'react-router-dom'
import { toast } from 'sonner'
import { tasks } from '../../../../assets/data'
import Tabs from '../Tabs'
import { PRIORITY_STYLES, TASK_TYPE, getInitials } from '../../../../utils'
import Loading from '../../../common/Loading'
import ButtonElement from './../../../common/ButtonElement'
import Title from './../../../common/Title'
import { useGetAppicationByIdQuery } from '../../../../redux/slices/api/applicationApiSlice'

const assets = [
  'https://images.pexels.com/photos/2418664/pexels-photo-2418664.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  'https://images.pexels.com/photos/8797307/pexels-photo-8797307.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  'https://images.pexels.com/photos/2534523/pexels-photo-2534523.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  'https://images.pexels.com/photos/804049/pexels-photo-804049.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
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
  'Clarification',
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
  console.log(task)

  const [selected, setSelected] = useState(0)

  return (
    <div className="w-full flex flex-col gap-3 mb-4 overflow-y-hidden">
      <Title title={task?.title} className="pointer-events-none" />

      <Tabs tabs={TABS} setSelected={setSelected}>
        {selected === 0 ? (
          <>
            <div className="w-full flex flex-col md:flex-row gap-5 2xl:gap-8 bg-white shadow-md p-8 overflow-y-auto">
              {/* LEFT */}
              <div className="w-full md:w-1/2 space-y-8">
                <div className="flex items-center gap-5">
                  <div
                    className={clsx(
                      'flex gap-1 items-center text-base font-semibold px-3 py-1 rounded-full',
                      PRIORITY_STYLES[task?.priority],
                      bgColor[task?.priority]
                    )}
                  >
                    <span className="text-lg">{ICONS[task?.priority]}</span>
                    <span className="uppercase">{task?.priority} Priority</span>
                  </div>

                  <div className={clsx('flex items-center gap-2')}>
                    <div
                      className={clsx(
                        'w-4 h-4 rounded-full',
                        TASK_TYPE[task?.title]
                      )}
                    />
                    <span className="text-black uppercase">{task?.status}</span>
                  </div>
                </div>

                <p className="text-gray-500">
                  Created At: {new Date(task?.createdAt).toDateString()}
                </p>

                <div className="space-y-4 py-6">
                  <p className="text-gray-500 font-semibold text-sm">
                    DESCRIPTION
                  </p>
                  <div className="space-y-8">
                    <p className="text-gray-700">{task?.description}</p>
                  </div>
                </div>

                <div className="flex items-center gap-8 p-4 border-y border-gray-200">
                  <div className="space-x-2">
                    <span className="font-semibold">Assets :</span>
                    <span>{task?.assets?.length}</span>
                  </div>

                  <span className="text-gray-400">|</span>

                  <div className="space-x-2">
                    <span className="font-semibold">Task :</span>
                    <span>{task?.tasks?.length}</span>
                  </div>
                </div>

                <div className="space-y-4 py-6">
                  <p className="text-gray-600 font-semibold text-sm">TEAM</p>
                  <div className="space-y-3">
                    {task?.team?.map((m, index) => (
                      <div
                        key={index}
                        className="flex gap-4 py-2 items-center border-t border-gray-200"
                      >
                        <div
                          className={
                            'w-10 h-10 rounded-full text-white flex items-center justify-center text-sm -mr-1 bg-blue-600'
                          }
                        >
                          <span className="text-center">
                            {getInitials(m?.name)}
                          </span>
                        </div>

                        <div>
                          <p className="text-lg font-semibold">{m?.name}</p>
                          <span className="text-gray-500">{m?.title}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-4 py-6">
                  <p className="text-gray-500 font-semibold text-sm">TASKS</p>
                  <div className="space-y-8">
                    {task?.tasks?.map((el, index) => (
                      <div key={index} className="flex gap-3">
                        <div className="w-10 h-10 flex items-center justify-center rounded-full bg-violet-50-200">
                          <MdTaskAlt className="text-violet-600" size={26} />
                        </div>

                        <div className="space-y-1">
                          <div className="flex gap-2 items-center">
                            <span className="text-sm text-gray-500">
                              {new Date(el?.date).toDateString()}
                            </span>

                            <span className="px-2 py-0.5 text-center text-sm rounded-full bg-violet-100 text-violet-700 font-semibold">
                              {el?.tag}
                            </span>
                          </div>

                          <p className="text-gray-700">{el?.title}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              {/* RIGHT */}
              <div className="w-full md:w-1/2 space-y-8">
                <p className="text-lg font-semibold">ASSETS</p>

                <div className="w-full grid grid-cols-2 gap-4">
                  {task?.assets?.map((el, index) => (
                    <img
                      key={index}
                      src={el}
                      alt={task?.title}
                      className="w-full rounded h-28 md:h-36 2xl:h-52 cursor-pointer transition-all duration-300 hover:scale-105"
                    />
                  ))}
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <Activities activity={task?.activities} id={id} />
          </>
        )}
      </Tabs>
    </div>
  )
}

const Activities = ({ activity, id }) => {
  const [selected, setSelected] = useState(act_types[0])
  const [text, setText] = useState('')
  const isLoading = false

  const handleSubmit = async () => {}

  const Card = ({ item }) => {
    return (
      <div className="flex space-x-4">
        <div className="flex flex-col items-center flex-shrink-0">
          <div className="w-10 h-10 flex items-center justify-center">
            {TASKTYPEICON[item?.title]}
          </div>
          <div className="w-full flex items-center">
            <div className="w-0.5 bg-gray-300 h-full"></div>
          </div>
        </div>

        <div className="flex flex-col gap-y-1 mb-8">
          <p className="font-semibold">{item?.title}</p>
          <div className="text-gray-500 space-y-2">
            <span className="capitalize">{item?.comment}</span>
            {/* <span className="text-sm">{moment(item?.date).fromNow()}</span> */}
          </div>
          <div className="text-gray-700">{item?.activity}</div>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full flex gap-10 2xl:gap-20 min-h-screen px-10 py-8 bg-white shadow rounded-md justify-between overflow-y-auto">
      <div className="w-full md:w-1/2">
        <h4 className="text-gray-600 font-semibold text-lg mb-5">Activities</h4>

        <div className="w-full">
          {activity?.map((el, index) => (
            <Card
              key={index}
              item={el}
              isConnected={index < activity.length - 1}
            />
          ))}
        </div>
      </div>

      <div className="w-full md:w-[100%]">
        <h4 className="text-gray-600 font-semibold text-lg">Add Activity</h4>
        <div className="w-full flex flex-wrap gap-5">
          {act_types.map((item, index) => (
            <div key={item} className="flex gap-2 items-center">
              <input
                type="checkbox"
                className="w-4 h-4"
                checked={selected === item ? true : false}
                onChange={(e) => setSelected(item)}
              />
              <p>{item}</p>
            </div>
          ))}
          <textarea
            rows={10}
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type ......"
            className="bg-white w-full mt-10 border border-gray-300 outline-none p-4 rounded-md focus:ring-2 ring-blue-500"
          ></textarea>
          {isLoading ? (
            <Loading />
          ) : (
            <ButtonElement
              className={clsx(
                'px-4 py-2 rounded-lg',
                'bg-blue-50/50 text-blue-600',
                'hover:bg-blue-100/80 hover:text-blue-700',
                'backdrop-blur-sm shadow-sm',
                'transition-all duration-300',
                'flex items-center gap-2'
              )}
              type="button"
              label="Submit"
              onClick={handleSubmit}
            />
          )}
        </div>
      </div>
    </div>
  )
}
export default ApplicationDetail
