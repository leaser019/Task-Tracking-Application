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
import Modal from '../../common/modal/Modal'
import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import { useForm } from 'react-hook-form'
import { useLogoutMutation } from '../../../redux/slices/api/authApiSlice'
import { toast } from 'sonner'
import { setCredentials } from '../../../redux/slices/authenticationSlice'
import {
  useUpdateUserMutation,
  useChangePasswordMutation,
} from '../../../redux/slices/api/userApiSlice'

const UserAvatar = () => {
  const mainColor = '#0084ff'
  const { user } = useSelector((state) => state.authentication)
  const config = genConfig({
    id: JSON.stringify(user?.user_name),
    bgColor: { mainColor },
  })
  const [openPassword, setOpenPassword] = useState(false)
  const [modal, setModal] = useState(false)
  const [logout] = useLogoutMutation()
  const [updateUser] = useUpdateUserMutation()
  const [updatePassword] = useChangePasswordMutation()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const logoutHandler = async () => {
    try {
      const { data } = await logout({})
      dispatch(setCredentials(null))
      toast.success(
        (data?.message && `${data?.message}! Have a nice day!`) ||
          'Logout successfully! Have a nice day!'
      )
      navigate('/login')
    } catch (error) {
      toast.error(
        error?.message ||
          error?.data?.message ||
          error?.data?.detail ||
          error?.data?.errors ||
          'An error occurred: unknown error'
      )
    }
  }

  const updateUserHandler = async (payload) => {
    try {
      const { data } = await updateUser({ body: payload })
      dispatch(setCredentials(data))
      toast.success('Profile updated successfully')
      setModal(false)
    } catch (error) {
      toast.error(
        error?.message ||
          error?.data?.message ||
          error?.data?.detail ||
          error?.data?.errors ||
          'An error occurred: unknown error'
      )
    }
  }

  const updatePasswordHandler = async (payload) => {
    try {
      const { data } = await updatePassword({ body: payload })
      toast.success(data?.message)
      setOpenPassword(false)
      dispatch(setCredentials(null))
      navigate('/login')
    } catch (error) {
      toast.error(
        error?.message ||
          error?.data?.message ||
          error?.data?.detail ||
          error?.data?.errors ||
          'An error occurred: unknown error'
      )
    }
  }

  const handleModal = () => {
    setModal(!modal)
    setOpenPassword(false)
  }

  const handlePassword = () => {
    setOpenPassword(!openPassword)
    setModal(false)
  }

  const {
    register: registerProfile,
    handleSubmit: submitProfile,
    formState: { error: errorProfile },
  } = useForm()

  const profileSubmitHandler = (payload) => {
    updateUserHandler(payload)
  }

  const {
    register: registerPassword,
    handleSubmit: submitPassword,
    formState: { error: errorPassword },
    reset: resetPassword,
  } = useForm()

  const passwordSubmitHandler = (payload) => {
    if (payload.newPassword !== payload.reTypeNewPassword) {
      toast.error('New password does not match')
    } else {
      updatePasswordHandler(payload)
      resetPassword()
    }
  }

  return (
    <React.Fragment>
      {/* Change Password */}
      <div>
        <form onSubmit={submitPassword(passwordSubmitHandler)}>
          <Modal show={openPassword} onClose={handlePassword}>
            <div className="flex flex-row justify-center items-center text-center w-[100%] gap-2">
              <div className="bg-white p-6 rounded-lg w-[100%] md:w-[93%] lg:w-[95%]">
                <h1 className="text-2xl font-bold">Change Password</h1>
                <div className="flex justify-center">
                  <Avatar className="w-20 h-20 px-1" {...config} />
                </div>
                <h1 className="text-xl font-semibold mt-4">
                  {user?.user_name}
                </h1>
                <p>{user?.role}</p>
                <div className="flex flex-row w-[100%] gap-4 py-6">
                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <TextField
                        {...registerPassword('oldPassword', {
                          title: 'Old Password Is Require',
                        })}
                        id="oldPassword"
                        name="oldPassword"
                        label="Old Password"
                        size="normal"
                        variant="outlined"
                        fullWidth
                        required
                        type="password"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        {...registerPassword('newPassword', {
                          title: 'New Password Is Require',
                        })}
                        id="newPassword"
                        name="newPassword"
                        label="New Password"
                        size="normal"
                        variant="outlined"
                        fullWidth
                        required
                        type="password"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        {...registerPassword('reTypeNewPassword', {
                          title: 'Re-write Password Is Require',
                        })}
                        id="reTypeNewPassword"
                        name="reTypeNewPassword"
                        label="Re-type New Password"
                        size="normal"
                        variant="outlined"
                        fullWidth
                        required
                        type="password"
                      />
                    </Grid>

                    <Grid item xs={4}></Grid>
                    <Grid item xs={4}></Grid>
                    <Grid item xs={4}>
                      <Button
                        style={{
                          backgroundColor: '#2489FF',
                          marginLeft: '34%',
                        }}
                        type="submit"
                        variant="contained"
                        size="medium"
                      >
                        Save Change
                      </Button>
                    </Grid>
                  </Grid>
                </div>
              </div>
            </div>
          </Modal>
        </form>
      </div>

      {/* Change User Profile */}
      <div>
        <form onSubmit={submitProfile(profileSubmitHandler)}>
          <Modal show={modal} onClose={handleModal}>
            <div className="flex flex-row justify-center items-center text-center w-[100%] gap-2">
              <div className="bg-white p-6 rounded-lg w-[100%] md:w-[93%] lg:w-[95%]">
                <h1 className="text-2xl font-bold">Edit Your Profile</h1>
                <div className="flex justify-center">
                  <Avatar className="w-20 h-20 px-1" {...config} />
                </div>
                <h1 className="text-xl font-semibold mt-4">
                  {user?.user_name}
                </h1>
                <p>{user?.role}</p>
                <div className="flex flex-row w-[100%] gap-4 py-6">
                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <TextField
                        {...registerProfile('user_name', {
                          title: 'Username Is Require',
                        })}
                        id="user_name"
                        name="user_name"
                        label="Username"
                        size="normal"
                        variant="outlined"
                        defaultValue={user?.user_name}
                        fullWidth
                        required
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        {...registerProfile('role', {
                          title: 'Title Is Require',
                        })}
                        id="role"
                        name="role"
                        label="Title"
                        size="normal"
                        variant="outlined"
                        defaultValue={user?.role}
                        fullWidth
                        required
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        id="email"
                        name="email"
                        label="Email"
                        size="normal"
                        variant="outlined"
                        defaultValue={user?.email}
                        fullWidth
                        disabled
                        required
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        id="role"
                        name="role"
                        label="Role"
                        size="normal"
                        variant="outlined"
                        defaultValue={user?.isAdmin ? 'Admin' : 'Member'}
                        fullWidth
                        disabled
                        required
                      />
                    </Grid>

                    <Grid item xs={4}></Grid>
                    <Grid item xs={4}></Grid>
                    <Grid item xs={4}>
                      <Button
                        style={{
                          backgroundColor: '#2489FF',
                          marginLeft: '34%',
                        }}
                        variant="contained"
                        size="medium"
                        type="submit"
                      >
                        Save Change
                      </Button>
                    </Grid>
                  </Grid>
                </div>
              </div>
            </div>
          </Modal>
        </form>
      </div>
      {/* Main User Avatar Component */}
      <Menu as="div" className="relative inline-block text-left pl-5">
        <div>
          <Menu.Button className="inline-flex w-full justify-center rounded-md bg-[#0084ff] px-2 py-2 text-sm font-medium text-white hover:bg-blue-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75">
            <div className="flex flex-col font-semibold hidden md:block">
              <h5>{user?.user_name}</h5>
              <p>{user?.role}</p>
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
            <div className="p-4">
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={() => {
                      handleModal()
                    }}
                    className="text-gray-700 group flex w-full items-center rounded-md px-2 py-2 text-base"
                  >
                    <Profile size="25" color="#374151" className="pr-2" />
                    Profile
                  </button>
                )}
              </Menu.Item>

              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={() => {
                      handlePassword()
                    }}
                    className={`text-gray-700 group flex w-full items-center rounded-md px-2 py-2 text-base`}
                  >
                    <Lock size="25" color="#374151" className="pr-2" />
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
                    <Logout size="25" color="#dc2626" className="pr-2" />
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
