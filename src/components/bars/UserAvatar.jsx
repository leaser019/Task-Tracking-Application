import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Menu } from '@headlessui/react'
import { Transition } from '@headlessui/react'
import { useState } from 'react'
import Avatar from 'react-nice-avatar'
import { genConfig } from 'react-nice-avatar'
import { useNavigate } from 'react-router-dom'
import { Profile } from 'iconsax-react'
import { Lock } from 'iconsax-react'
import { Logout } from 'iconsax-react'

const UserAvatar = () => {
 const { user } = useSelector(state => state.authentication)
 const config = genConfig({ id: JSON.stringify(user?.id), bgColor: "#0084ff" })
 const [open, setOpen] = useState(false)
 const [openPassword, setOpenPassword] = useState(false)
 const dispatch = useDispatch()
 const navigate = useNavigate()

 const logoutHandler = () => { console.log('Logout'); }

 return (
  <React.Fragment>
   <Menu as='div' className='relative inline-block text-left pl-5'>
    <div>
     <Menu.Button className="inline-flex w-full justify-center rounded-md bg-[#0084ff] px-2 py-2 text-sm font-medium text-white hover:bg-blue-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75">
      <div className='flex flex-col font-semibold hidden md:block'>
       <h5>{(user?.username)}</h5>
       <p>{(user?.role)}</p>
      </div>
      <Avatar className="w-8 h-8 px-1" {...config} />
     </Menu.Button>
    </div>
    <Transition
     as={React.Fragment}
     enter="transition ease-out duration-100"
     enterFrom="transform opacity-0 scale-95"
     enterTo="transform opacity-100 scale-100"
     leave="transition ease-in duration-75"
     leaveFrom="transform opacity-100 scale-100"
     leaveTo="transform opacity-0 scale-95"
    >
     <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
      <div className='p-4'>

       <Menu.Item>
        {({ active }) => (
         <button
          onClick={() => setOpen(true)}
          className='text-gray-700 group flex w-full items-center rounded-md px-2 py-2 text-base'
         >
          <Profile
           size="25"
           color="#374151"
           className='pr-2'
          />
          Profile
         </button>
        )}
       </Menu.Item>

       <Menu.Item>
        {({ active }) => (
         <button
          onClick={() => setOpenPassword(true)}
          className={`tetx-gray-700 group flex w-full items-center rounded-md px-2 py-2 text-base`}
         >
          <Lock
           size="25"
           color="#374151"
           className='pr-2'
          />
          Change Password
         </button>
        )}
       </Menu.Item>

       <Menu.Item>
        {({ active }) => (
         <button
          onClick={logoutHandler}
          className={`text-red-600 group flex w-full items-center rounded-md px-2 py-2 text-base`}
         >
          <Logout
           size="25"
           color="#dc2626"
           className='pr-2'
          />
          Logout
         </button>
        )}
       </Menu.Item>

      </div>
     </Menu.Items>
    </Transition>
   </Menu>
  </React.Fragment>


 )
}

export default UserAvatar