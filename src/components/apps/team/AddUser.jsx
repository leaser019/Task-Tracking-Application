import React from 'react'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import ModalWrapper from '../../common/modal/ModalWrapper'
import { Dialog } from '@headlessui/react'
import Loading from '../../common/Loading'
import { Grid, TextField, Button, MenuItem } from '@mui/material'
import { useRegisterMutation } from '../../../redux/slices/api/authApiSlice'
import { useUpdateUsersMutation } from '../../../redux/slices/api/teamApiSlice'
import { toast } from 'sonner'

const AddUser = ({ open, setOpen, userData, refetch }) => {
  const defaultValues = userData ?? {}
  const [register, { isLoading: isRegistering }] = useRegisterMutation()
  const [updateUsers, { isLoading: isUpdating }] = useUpdateUsersMutation()
  const isLoading = isRegistering || isUpdating

  const {
    register: registerField,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      email: defaultValues?.email || '',
      user_name: defaultValues?.user_name || '',
      role: defaultValues?.role || '',
      password: '',
    },
  })

  const handleOnSubmit = async (data) => {
    try {
      if (userData) {
        const { message } = await updateUsers({
          body: {
            user_name: data?.user_name,
            role: data?.role,
          },
          email: data?.email,
        }).unwrap()
        toast.success('User profile updated successfully!')
        refetch()
      } else {
        await register(data).unwrap()
        toast.success('New user added successfully!')
        refetch()
      }
      setOpen(false)
      reset()
    } catch (error) {
      toast.error(
        error?.data?.message ||
          error?.data?.detail ||
          'An error occurred while processing your request'
      )
    }
  }

  return (
    <ModalWrapper open={open} setOpen={setOpen}>
      <div className="bg-white rounded-xl p-6 max-w-md w-full mx-auto ">
        <Dialog.Title className="text-2xl font-bold text-center mb-8">
          <span className="text-blue-600">
            {userData ? 'Update User Profile' : 'Add New Team Member'}
          </span>
        </Dialog.Title>

        <form
          onSubmit={handleSubmit(handleOnSubmit)}
          className="space-y-6 mr-6"
        >
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Email Address"
                disabled={!!userData}
                {...registerField('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Please enter a valid email address',
                  },
                })}
                error={!!errors.email}
                helperText={errors.email?.message}
                className="rounded-lg"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '&:hover fieldset': {
                      borderColor: '#3b82f6',
                    },
                  },
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Username"
                {...registerField('user_name', {
                  required: 'Username is required',
                  minLength: {
                    value: 2,
                    message: 'Username must be at least 2 characters',
                  },
                })}
                error={!!errors.user_name}
                helperText={errors.user_name?.message}
                className="rounded-lg"
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Role"
                {...registerField('role', {
                  required: 'Role is required',
                })}
                error={!!errors.role}
                className="rounded-lg"
              />
            </Grid>

            {!userData && (
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  type="password"
                  label="Password"
                  {...registerField('password', {
                    required: 'Password is required',
                    minLength: {
                      value: 6,
                      message: 'Password must be at least 6 characters',
                    },
                  })}
                  error={!!errors.password}
                  helperText={errors.password?.message}
                  className="rounded-lg"
                />
              </Grid>
            )}

            <Grid item xs={12}>
              <div className="flex gap-3 pt-4">
                <Button
                  onClick={() => setOpen(false)}
                  variant="outlined"
                  fullWidth
                  className="rounded-lg hover:bg-gray-50"
                  sx={{
                    borderColor: '#e5e7eb',
                    color: '#4b5563',
                    '&:hover': {
                      borderColor: '#d1d5db',
                    },
                  }}
                >
                  Cancel
                </Button>

                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  disabled={isLoading}
                  className="rounded-lg"
                  sx={{
                    backgroundColor: '#3b82f6',
                    '&:hover': {
                      backgroundColor: '#2563eb',
                    },
                  }}
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <Loading size={20} />
                    </div>
                  ) : userData ? (
                    'Update Profile'
                  ) : (
                    'Add Member'
                  )}
                </Button>
              </div>
            </Grid>
          </Grid>
        </form>
      </div>
    </ModalWrapper>
  )
}

export default AddUser
