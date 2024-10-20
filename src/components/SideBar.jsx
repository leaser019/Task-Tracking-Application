import React from 'react'
import { Category } from 'iconsax-react';
import { TaskSquare } from 'iconsax-react';
import { Bookmark } from 'iconsax-react';
import { Edit } from 'iconsax-react';
import { Check } from 'iconsax-react';
import { Task } from 'iconsax-react';
import { Profile2User } from 'iconsax-react';
import { Trash } from 'iconsax-react';
import { Stickynote } from 'iconsax-react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { setSlideBarOpen } from '../redux/slices/authenticationSlice';
import clsx from 'clsx';

const iconSize = '30'
const colorTag = '#292d32'
const colorChoose = '#F5F5F0'

const defaultData = [
 {
  label: 'Dashboard',
  link: 'dashboard',
  icon: <Category size={iconSize} color={colorTag} />,
  iconChoose: <Category size={iconSize} color={colorChoose} />
 },
 {
  label: 'Application',
  link: 'application',
  icon: <TaskSquare size={iconSize} color={colorTag} />,
  iconChoose: <TaskSquare size={iconSize} color={colorChoose} />
 },
 {
  label: 'To Do',
  link: 'todo',
  icon: <Bookmark size={iconSize} color={colorTag} />,
  iconChoose: <Bookmark size={iconSize} color={colorChoose} />

 },
 {
  label: 'Implement',
  link: 'implement',
  icon: <Edit size={iconSize} color={colorTag} />,
  iconChoose: <Edit size={iconSize} color={colorChoose} />
 },
 {
  label: 'QA/QC',
  link: 'qa-qc',
  icon: <Check size={iconSize} color={colorTag} />,
  iconChoose: <Check size={iconSize} color={colorChoose} />
 },
 {
  label: 'Production',
  link: 'production',
  icon: <Task size={iconSize} color={colorTag} />,
  iconChoose: <Task size={iconSize} color={colorChoose} />
 },
 {
  label: 'Team',
  link: 'team',
  icon: <Profile2User size={iconSize} color={colorTag} />,
  iconChoose: <Profile2User size={iconSize} color={colorChoose} />
 },
 {
  label: 'Trash',
  link: 'trash',
  icon: <Trash size={iconSize} color={colorTag} />,
  iconChoose: <Trash size={iconSize} color={colorChoose} />
 },
]

const SideBar = () => {
 const user = useSelector(state => state.authentication)
 const dispatch = useDispatch()
 const location = useLocation()
 const sideBarUserData = (user?.isAdmin) ? defaultData : defaultData
 const path = location.pathname.split('/')[1]

 const closeSideBar = () => {
  dispatch(setSlideBarOpen(false))
 }

 const NavigationLink = ({ element }) => <Link to={element.link} onClick={closeSideBar} className={clsx("w-full lg:w-3/4 gap-2 px-3 py-2 rounded-full items-center text-gray-800 text-base hover:bg-[#2564ed2d]", path === element.link.split('/')[0] ? "bg-blue-600 text-neutral-100" : "")}>
  <div className='flex flex-row items-center' >
   <i>{path === element.link.split('/')[0] ? element.iconChoose : element.icon}</i>
   <span className='pl-3 text-lg hover:text-[#0084FF] text-pretty'>{element.label}</span>
  </div>
 </Link>

 return (
  <div className='w-full h-full flex flex-col gap-6 p-5'>
   <h1 className='flex gap-1 items-center'>
    <p><Stickynote size="50" color="#0084ff" /></p>
    <span className='font-bold text-black text-3xl pl-3'>Kepler</span>
   </h1>
   <div className='flex-1 flex flex-col gap-y-4 py-4'>
    {sideBarUserData.map((element) => <NavigationLink element={element} />)}
   </div>
  </div>
 )
}

export default SideBar