import { apiSlice } from '../apiSlice'

const TEAM_URL = '/user'

export const teamApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: () => ({
        url: `${TEAM_URL}/get-all-info`,
        method: 'GET',
        credentials: 'include',
      }),
      providesTags: ['Users'],
    }),
    deleteUser: builder.mutation({
      query: (email) => ({
        url: `${TEAM_URL}/disable-account/${email}`,
        method: 'PUT',
        credentials: 'include',
      }),
    }),
    activeAccount: builder.mutation({
      query: (email) => ({
        url: `${TEAM_URL}/enable-account/${email}`,
        method: 'PUT',
        credentials: 'include',
      }),
      invalidatesTags: ['Users'],
    }),
    updateUsers: builder.mutation({
      query: ({ body, email }) => ({
        url: `${TEAM_URL}/admin/update-user/${email}`,
        method: 'PUT',
        body,
        credentials: 'include',
      }),
      invalidatesTags: ['Users'],
    }),
    deleteUserForever: builder.mutation({
      query: (email) => ({
        url: `${TEAM_URL}/delete/${email}`,
        method: 'DELETE',
        credentials: 'include',
      }),
      invalidatesTags: ['Users'],
    }),
  }),
})

export const {
  useGetAllUsersQuery,
  useDeleteUserMutation,
  useActiveAccountMutation,
  useUpdateUsersMutation,
  useDeleteUserForeverMutation,
} = teamApiSlice
