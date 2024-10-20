import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setSlideBarOpen } from '../../redux/slices/authenticationSlice'
import { Menu } from 'iconsax-react';
import { SearchNormal1 } from 'iconsax-react';
import NotificationPanel from './NotificationPanel';
import UserAvatar from './UserAvatar';


const NavBar = () => {
 const { user } = useSelector(state => state.authentication)
 const dispatch = useDispatch()
 return (
  <div className='flex justify-between items-center bg-white px-4 py-3 2xl:py-4 sticky z-10 top-0'>
   <div className='flex gap-4'>
    <button className='text-2xl text-gray-500 block md:hidden' onClick={() => dispatch(setSlideBarOpen(true))}>
     <Menu
      size="32"
      color="#555555"
     />
    </button>
    <div className='w-70 2xl:w-[400px] flex items-center py-2 px-3 gap-2 rounded-full bg-[#f3f4f6]'>
     <SearchNormal1 size="25" color="#555555" />
     <input className='w-65 2xl:w-[400px] outline-none bg-transparent placeholder:#555555' type='text' placeholder='Search for anything...' />

    </div>
   </div>
   <div className='flex gap-2 items-center'>
    <NotificationPanel />
    <UserAvatar />
   </div>
  </div>
 )
}

export default NavBar