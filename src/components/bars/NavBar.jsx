import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setSlideBarOpen } from '../../redux/slices/authenticationSlice'
import { setSearchResults } from '../../redux/slices/applicationSlice'
import { Menu, SearchNormal1 } from 'iconsax-react'
import NotificationPanel from './subComponents/NotificationPanel'
import UserAvatar from './subComponents/UserAvatar'
import { useLocation } from 'react-router-dom'
import { useSearchApplicationQuery } from '../../redux/slices/api/applicationApiSlice'

const NavBar = () => {
  const { user } = useSelector((state) => state.authentication)
  const dispatch = useDispatch()
  const location = useLocation()
  const [searchTerm, setSearchTerm] = useState('')
  const { data: searchResults } = useSearchApplicationQuery(searchTerm, {
    skip: !searchTerm,
  })

  const handleSearch = (e) => {
    setSearchTerm(e.target.value)
    if (searchResults) {
      dispatch(setSearchResults({ type: 'application', data: searchResults }))
    }
  }

  return (
    <div className="flex justify-between items-center bg-white px-4 py-3 2xl:py-4 sticky z-10 top-0 shadow-md shadow-gray-200/50">
      <div className="flex gap-4">
        <button
          className="text-2xl text-gray-500 block md:hidden"
          onClick={() => dispatch(setSlideBarOpen(true))}
        >
          <Menu size="32" color="#555555" />
        </button>
        {location.pathname !== '/dashboard' &&
          location.pathname !== '/team' &&
          location.pathname !== '/trash' && (
            <div className="sm:w-30 w-[500px] 2xl:w-[400px] flex items-center py-2 px-3 gap-2 rounded-full bg-[#f3f4f6]">
              <SearchNormal1 size="25" color="#555555" />
              <input
                className="w-[350px] sm:w-25 2xl:w-[300px] outline-none bg-transparent placeholder:#555555"
                type="text"
                placeholder="Search for anything..."
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
          )}
      </div>
      <div className="flex gap-2 items-center">
        <NotificationPanel />
        <UserAvatar />
      </div>
    </div>
  )
}

export default NavBar
