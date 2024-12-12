import React from 'react'
import {
  Category,
  TaskSquare,
  Bookmark,
  Edit,
  Check,
  Task,
  Profile2User,
  Trash,
  Stickynote,
  Message,
} from 'iconsax-react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, Link } from 'react-router-dom'
import { setSlideBarOpen } from '../../redux/slices/authenticationSlice'
import clsx from 'clsx'
import UserAvatar from './subComponents/UserAvatar'
import { IoArrowBack } from 'react-icons/io5'
import Title from '../common/Title'

const iconSize = '24'
const colorTag = '#4B5563'
const colorChoose = '#FFFFFF'

const defaultData = [
  {
    label: 'Dashboard',
    link: 'dashboard',
    icon: <Category size={iconSize} color={colorTag} />,
    iconChoose: <Category size={iconSize} color={colorChoose} />,
  },
  {
    label: 'Application',
    link: 'application',
    icon: <TaskSquare size={iconSize} color={colorTag} />,
    iconChoose: <TaskSquare size={iconSize} color={colorChoose} />,
  },
  {
    label: 'To Do',
    link: 'todo',
    icon: <Bookmark size={iconSize} color={colorTag} />,
    iconChoose: <Bookmark size={iconSize} color={colorChoose} />,
  },
  {
    label: 'Implement',
    link: 'implement',
    icon: <Edit size={iconSize} color={colorTag} />,
    iconChoose: <Edit size={iconSize} color={colorChoose} />,
  },
  {
    label: 'QA/QC',
    link: 'qa-qc',
    icon: <Check size={iconSize} color={colorTag} />,
    iconChoose: <Check size={iconSize} color={colorChoose} />,
  },
  {
    label: 'Production',
    link: 'production',
    icon: <Task size={iconSize} color={colorTag} />,
    iconChoose: <Task size={iconSize} color={colorChoose} />,
  },
  {
    label: 'Messages',
    link: 'chat',
    icon: <Message size={iconSize} color={colorTag} />,
    iconChoose: <Message size={iconSize} color={colorChoose} />,
  },
  {
    label: 'Team',
    link: 'team',
    icon: <Profile2User size={iconSize} color={colorTag} />,
    iconChoose: <Profile2User size={iconSize} color={colorChoose} />,
  },
  {
    label: 'Trash',
    link: 'trash',
    icon: <Trash size={iconSize} color={colorTag} />,
    iconChoose: <Trash size={iconSize} color={colorChoose} />,
  },
]

const SideBar = ({ status }) => {
  const user = useSelector((state) => state.authentication)
  const dispatch = useDispatch()
  const location = useLocation()
  const sideBarUserData = user?.user?.isAdmin
    ? defaultData
    : defaultData.slice(0, 7)
  const path = location.pathname.split('/')[1]

  const closeSideBar = () => dispatch(setSlideBarOpen(false))

  const NavigationLink = ({ element }) => (
    <Link
      to={element.link}
      onClick={closeSideBar}
      className={clsx(
        'w-full lg:w-[90%] mx-auto transition-all duration-200 ease-in-out',
        'flex items-center px-4 py-3 rounded-xl',
        'hover:bg-blue-50 hover:scale-105',

        path === element.link.split('/')[0]
          ? 'bg-blue-600 shadow-lg shadow-blue-200 text-white transform scale-105'
          : 'text-gray-700 hover:text-blue-600'
      )}
    >
      <div className="flex items-center w-full">
        <div
          className={clsx(
            'p-2 rounded-lg',
            path === element.link.split('/')[0] ? 'bg-blue-500' : 'bg-gray-100'
          )}
        >
          {path === element.link.split('/')[0]
            ? element.iconChoose
            : element.icon}
        </div>
        <span
          className={clsx(
            'ml-3 font-medium text-base transition-colors duration-200 hidden md:flex',
            path === element.link.split('/')[0] ? 'text-white' : 'text-gray-700'
          )}
        >
          {element.label}
        </span>
      </div>
    </Link>
  )

  return (
    <div className="w-full h-full flex flex-col bg-white shadow-xl">
      <div className="px-6 py-8">
        <Link to="/dashboard">
          <div className="flex items-center gap-3">
            <img
              src="./assets/logo/logoApp.png"
              alt="Logo"
              className="w-10 h-10 object-contain hidden xl:block"
            />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
              Kepler.
            </h1>
          </div>
        </Link>
      </div>

      <nav className="flex-1 px-3 py-6 space-y-1 overflow-y-auto">
        {sideBarUserData.map((element, index) => (
          <NavigationLink key={index} element={element} />
        ))}
      </nav>
      <div className="p-4">
        <div className="px-3 py-2 text-sm text-gray-500">© 2024 Kepler</div>
      </div>
    </div>
  )
}

export default SideBar
