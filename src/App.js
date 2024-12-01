import { replace } from 'react-router-dom'
import { Route } from 'react-router-dom'
import { Router } from 'react-router-dom'
import { Routes } from 'react-router-dom'
import { Navigate } from 'react-router-dom'
import { Outlet } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import Team from './pages/Team'
import { Toaster } from 'sonner'
import Application from './pages/Application'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { useRef } from 'react'
import SideBar from './components/bars/SideBar'
import NavBar from './components/bars/NavBar'
import { setSlideBarOpen } from './redux/slices/authenticationSlice'
import React from 'react'
import { Transition } from '@headlessui/react'
import clsx from 'clsx'
import { CloseCircle } from 'iconsax-react'
import TrashBin from './pages/TrashBin'
import Contact from './components/apps/login/Contact'
import ApplicationDetail from './components/apps/application/applicationDetail/ApplicationDetails'

const MobileSideBar = () => {
  const { isSideBarOpen } = useSelector((state) => state?.authentication)
  const moblieMenuRef = useRef(null)
  const dispatch = useDispatch()

  const closeSideBar = () => {
    dispatch(setSlideBarOpen(false))
  }

  return (
    <>
      <Transition
        show={isSideBarOpen || false}
        as={React.Fragment}
        enter="transition-opacity duration-700"
        enterFrom="opacity-x-10"
        enterTo="opacity-x-100"
        leave="transition-opacity duration-700"
        leaveFrom="opacity-x-100"
        leaveTo="opacity-x-0"
      >
        {(ref) => (
          <div
            ref={(node) => (moblieMenuRef.current = node)}
            className={clsx(
              'md:hidden w-full h-full bg-black/40 transition-all duration-700 transform ',
              isSideBarOpen ? 'translate-x-0' : 'translate-x-full'
            )}
            onClick={() => closeSideBar()}
          >
            <div className="bg-white w-3/4 h-full">
              <div className="w-full flex justify-end px-5 mt-5">
                <button
                  onClick={() => closeSideBar()}
                  className="flex justify-end items-end"
                >
                  <CloseCircle size="25" color="#FF8A65" />
                </button>
              </div>

              <div className="-mt-10">
                <SideBar />
              </div>
            </div>
          </div>
        )}
      </Transition>
    </>
  )
}

const Layout = () => {
  const { user } = useSelector((state) => state.authentication)
  const location = useLocation()

  return location.pathname != '/contact' ? (
    user ? (
      <div className="w-full h-screen flex flex-col md:flex-row">
        <div className="w-1/5 h-screen bg-white sticky top-0 md:block shadow-lg rounded-tr-lg">
          <SideBar />
        </div>
        <MobileSideBar />
        <div className="flex-1 overflow-y-auto shadow-lg rounded-tl-lg">
          <NavBar />
          <div className="p-4 2x1:px-10">
            <Outlet />
          </div>
        </div>
      </div>
    ) : (
      <Navigate to="login" state={{ from: location }} replace />
    )
  ) : (
    <Navigate to="contact" state={{ from: location }} replace />
  )
}

function App() {
  return (
    <div>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/team" element={<Team />} />
          <Route path="/application" element={<Application />} />
          <Route path="/todo" element={<Application status="todo" />} />
          <Route
            path="/implement"
            element={<Application status="implement" />}
          />
          <Route path="/qa-qc" element={<Application status="testing" />} />
          <Route
            path="/production"
            element={<Application status="production" />}
          />
          <Route path="/application/:id" element={<ApplicationDetail />} />
          <Route path="/trash" element={<TrashBin />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <Toaster richColors />
    </div>
  )
}

export default App
