import { apiSlice } from '../apiSlice'
import { credentialsTransformer } from '../../transformers/credentialsTransformer'

const AUTH_URL = '/user'

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (body) => ({
        url: `${AUTH_URL}/login`,
        method: 'POST',
        body,
        credentials: 'include',
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        return credentialsTransformer(dispatch, queryFulfilled)
      },
    }),
    logout: builder.mutation({
      query: () => ({
        url: `${AUTH_URL}/logout`,
        method: 'POST',
        credentials: 'include',
      }),
    }),
    register: builder.mutation({
      query: (body) => ({
        url: `${AUTH_URL}/register`,
        method: 'POST',
        body,
        credentials: 'include',
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        return credentialsTransformer(dispatch, queryFulfilled)
      },
    }),
  }),
})

export const { useLoginMutation, useLogoutMutation } = authApiSlice
