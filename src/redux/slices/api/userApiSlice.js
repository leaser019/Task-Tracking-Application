import { apiSlice } from '../apiSlice'
import { setCredentials } from '../authenticationSlice' // Import action

const USER_URL = '/user'

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    updateUser: builder.mutation({
      query: (body) => ({
        url: `${USER_URL}/profile`,
        method: 'PUT',
        body,
        credentials: 'include',
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          dispatch(setCredentials(data))
        } catch (error) {
          console.error('Update user failed', error)
        }
      },
    }),
    changePassword: builder.mutation({
      query: (body) => ({
        url: `${USER_URL}/change-password`,
        method: 'PUT',
        body,
        credentials: 'include',
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          dispatch(setCredentials(data))
        } catch (error) {
          console.error('Change password failed', error)
        }
      },
    }),
  }),
})

export const { useUpdateUserMutation, useChangePasswordMutation } = userApiSlice
