import { replace } from 'react-router-dom';
import { Route } from 'react-router-dom'
import { Router } from 'react-router-dom'
import { Routes } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login'
import Users from './pages/Users'
import ApplicationDetail from './pages/ApplicationDetail'
import { Toaster } from 'sonner';
import Application from './pages/Application';
import UserDetail from './pages/UserDetail'
import { useSelector } from 'react-redux'
import SideBar from './components/SideBar';
import MobileSideBar from './components/MobileSideBar';
import NavBar from './components/NavBar';

const Layout = () => {
  const { user } = useSelector(state => state.authentication)
  const location = useLocation()
  return user ? (
    <div className='w-full h-screen flex flex-col md:flex-row'>
      <div className='w-1/5 h-screen bg-white sticky top-0 hidden md:block shadow-lg'>
        <SideBar />
      </div>
      {/* <MobileSideBar /> */}
      <div className='flex-1 overflow-y-auto'>
        <NavBar />
        <div className='p-4 2x1:px-10'>
          <Outlet />
        </div>
      </div>
    </div>
  ) : (
    <Navigate to='login' state={{ from: location }} replace />
  )
}

function App() {
  return (
    <div>
      <Routes>
        <Route element={<Layout />}>
          <Route path='/' Navigate to="/dashboard" />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/team' element={<Users />} />
          <Route path='/application' element={<Application />} />
          <Route path='/todo/:status' element={<Application />} />
          <Route path='/implement/:status' element={<Application />} />
          <Route path='/qa-qc/:status' element={<Application />} />
          <Route path='/production/:status' element={<Application />} />
          <Route path='/application/:id' element={<ApplicationDetail />} />
        </Route>
        <Route path='/login' element={<Login />} />
        <Route path='/user/:id' element={<UserDetail />} />
      </Routes>
      <Toaster richColors />
    </div>
  )
}

export default App;
