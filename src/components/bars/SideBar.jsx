import React from 'react'
import { Category } from 'iconsax-react'
import { TaskSquare } from 'iconsax-react'
import { Bookmark } from 'iconsax-react'
import { Edit } from 'iconsax-react'
import { Check } from 'iconsax-react'
import { Task } from 'iconsax-react'
import { Profile2User } from 'iconsax-react'
import { Trash } from 'iconsax-react'
import { Stickynote } from 'iconsax-react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { setSlideBarOpen } from '../../redux/slices/authenticationSlice'
import clsx from 'clsx'

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

const SideBar = () => {
  const user = useSelector((state) => state.authentication)
  const dispatch = useDispatch()
  const location = useLocation()
  const sideBarUserData = user?.user?.isAdmin
    ? defaultData
    : defaultData.slice(0, 6)
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
            'ml-3 font-medium text-base transition-colors duration-200',
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
      <div className="px-6 py-8  ">
        <div className="flex items-center gap-3">
          <img
            src="./assets/logo/logoApp.png"
            alt="Logo"
            className="w-10 h-10 object-contain hidden xl:block "
          />
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
            Kepler.
          </h1>
        </div>
      </div>

      <nav className="flex-1 px-3 py-6 space-y-2">
        {sideBarUserData.map((element, index) => (
          <NavigationLink key={index} element={element} />
        ))}
      </nav>

      <div className="p-4 border-t border-gray-100">
        <div className="px-3 py-2 text-sm text-gray-500">© 2024 Kepler</div>
      </div>
    </div>
  )
}

export default SideBar
