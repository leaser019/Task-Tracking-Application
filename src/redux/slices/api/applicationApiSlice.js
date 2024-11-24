import { apiSlice } from '../apiSlice'

const APPLICATION_URL = '/app'

export const applicationApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllApplication: builder.query({
      query: () => ({
        url: `${APPLICATION_URL}/get-all`,
        method: 'GET',
        credentials: 'include',
      }),
    }),
    createApplication: builder.mutation({
      query: (body) => ({
        url: `${APPLICATION_URL}/add-new`,
        method: 'POST',
        body,
        credentials: 'include',
      }),
    }),
    duplicateApplication: builder.mutation({
      query: (body) => ({
        url: `${APPLICATION_URL}/duplicate/${body?._id}`,
        method: 'POST',
        body,
        credentials: 'include',
      }),
    }),
  }),
})

export const {
  useGetAllApplicationQuery,
  useCreateApplicationMutation,
  useDuplicateApplicationMutation,
} = applicationApiSlice
