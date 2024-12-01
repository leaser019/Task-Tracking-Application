import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setSlideBarOpen } from '../../redux/slices/authenticationSlice'
import { setSearchResults } from '../../redux/slices/applicationSlice'
import { Menu, SearchNormal1 } from 'iconsax-react'
import NotificationPanel from './subComponents/NotificationPanel'
import UserAvatar from './subComponents/UserAvatar'
import { useLocation } from 'react-router-dom'
import {
  useSearchApplicationQuery,
  useSearchToDoApplicationQuery,
  useSearchImplementApplicationQuery,
  useSearchTestingApplicationQuery,
  useSearchProductionApplicationQuery,
} from '../../redux/slices/api/applicationApiSlice'
import { useForm } from 'react-hook-form'
import { clearSearchResults } from '../../redux/slices/applicationSlice'

const NavBar = () => {
  const { user } = useSelector((state) => state.authentication)
  const dispatch = useDispatch()
  const location = useLocation()
  const { register, handleSubmit, reset } = useForm()
  const [searchTerm, setSearchTerm] = useState('')
  const [searchType, setSearchType] = useState('application')

  useEffect(() => {
    if (location.pathname.includes('todo')) {
      setSearchType('todo')
    } else if (location.pathname.includes('implement')) {
      setSearchType('implement')
    } else if (location.pathname.includes('qa-qc')) {
      setSearchType('testing')
    } else if (location.pathname.includes('production')) {
      setSearchType('production')
    } else {
      setSearchType('application')
    }
  }, [location.pathname])

  const searchQuery = {
    application: useSearchApplicationQuery,
    todo: useSearchToDoApplicationQuery,
    implement: useSearchImplementApplicationQuery,
    testing: useSearchTestingApplicationQuery,
    production: useSearchProductionApplicationQuery,
  }[searchType]

  const { data: searchResults } = searchQuery(searchTerm, {
    skip: !searchTerm,
  })

  const onSubmit = (data) => {
    setSearchTerm(data.searchTerm)
    reset()
  }

  useEffect(() => {
    if (searchTerm && searchResults) {
      dispatch(setSearchResults(searchResults))
    }
  }, [searchResults, dispatch, searchTerm, searchType])

  useEffect(() => {
    dispatch(clearSearchResults())
  }, [dispatch, location])

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
            <form
              className="items-center focus:bg-white focus:border focus:border-gray-300 sm:w-30 w-[500px] 2xl:w-[400px] flex items-center py-2 px-3 gap-2 rounded-full bg-[#f3f4f6] focus:ring focus:ring-gray-200"
              onSubmit={handleSubmit(onSubmit)}
            >
              <SearchNormal1 size="25" color="#555555" />
              <input
                className=" w-[370px] sm:w-25 2xl:w-[300px] outline-none bg-transparent placeholder-gray-500 px-2 py-1 rounded-full  "
                type="text"
                placeholder="Search for anything..."
                {...register('searchTerm')}
              />
              <select
                {...register('searchType')}
                className="outline-none bg-transparent border-none text-gray-700   focus:ring focus:ring-opacity-50"
                value={searchType}
                onChange={(e) => setSearchType(e.target.value)}
                disabled
              >
                <option value="application">Application</option>
                <option value="todo">To Do</option>
                <option value="implement">Implement</option>
                <option value="testing">QA-QC</option>
                <option value="production">Production</option>
              </select>
            </form>
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
