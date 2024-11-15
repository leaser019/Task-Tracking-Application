import { apiSlice } from '../apiSlice'
import { credentialsTransformer } from '../../transformers/credentialsTransformer'

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
        return credentialsTransformer(dispatch, queryFulfilled)
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
        return credentialsTransformer(dispatch, queryFulfilled)
      },
    }),
  }),
})

export const { useUpdateUserMutation, useChangePasswordMutation } = userApiSlice
